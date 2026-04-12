import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';

// Mock ResizeObserver for Radix UI components
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

// Mock PointerEvent for Radix UI components like Sheet/Dialog
if (!window.PointerEvent) {
  // @ts-expect-error - Mocking PointerEvent
  window.PointerEvent = class PointerEvent extends MouseEvent {};
}

// Mock other browser APIs not available in jsdom
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();

// Mock Radix UI Portal and Dialog to render children inline for easier testing
vi.mock('@radix-ui/react-portal', () => ({
  Portal: ({ children }: { children: React.ReactNode }) => children,
  Root: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock('@radix-ui/react-dialog', () => ({
  Root: ({ children, open }: any) => (open ? children : null),
  Trigger: ({ children }: any) => children,
  Portal: ({ children }: any) => children,
  Overlay: () => null,
  Content: ({ children }: any) => <div>{children}</div>,
  Close: ({ children }: any) => <button>{children}</button>,
  Title: ({ children }: any) => <h2>{children}</h2>,
  Description: ({ children }: any) => <p>{children}</p>,
}));

vi.mock('zustand/middleware', async (importOriginal) => {
  const actual = await importOriginal<typeof import('zustand/middleware')>();
  return {
    ...actual,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    persist: (config: any, _options: any) => config,
  };
});

// Mock Framer Motion to skip animations in tests
/* eslint-disable @typescript-eslint/no-unused-vars */
const filterMotionProps = ({
  initial: _initial,
  animate: _animate,
  exit: _exit,
  transition: _transition,
  variants: _variants,
  whileHover: _whileHover,
  whileTap: _whileTap,
  drag: _drag,
  dragConstraints: _dragConstraints,
  layout: _layout,
  onAnimationComplete: _onAnimationComplete,
  onViewportBoxUpdate: _onViewportBoxUpdate,
  whileDrag: _whileDrag,
  whileFocus: _whileFocus,
  whileInView: _whileInView,
  whileScroll: _whileScroll,
  whileDragEnd: _whileDragEnd,
  whileHoverEnd: _whileHoverEnd,
  ...rest
}: any) => rest;
/* eslint-enable @typescript-eslint/no-unused-vars */

const motionTags = [
  'a',
  'article',
  'aside',
  'button',
  'div',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'img',
  'input',
  'label',
  'li',
  'main',
  'nav',
  'ol',
  'p',
  'section',
  'span',
  'svg',
  'ul',
] as const;

const createMotionElement = (tag: string): ((props: any) => React.ReactElement) => 
  ({ children, ...props }: any) => React.createElement(tag, filterMotionProps(props), children);

vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();

  return {
    ...actual,
    motion: {
      ...actual.motion,
      ...Object.fromEntries(motionTags.map((tag) => [tag, createMotionElement(tag)])),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});
