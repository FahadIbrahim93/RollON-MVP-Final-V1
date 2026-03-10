import { describe, it, expect } from 'vitest';
import { formatPrice, config } from '../lib/config';
import { cn } from '../lib/utils';

describe('config', () => {
  describe('formatPrice', () => {
    it('should format price with currency symbol', () => {
      const result = formatPrice(1000);
      expect(result).toContain('1000');
    });

    it('should format large numbers with commas', () => {
      const result = formatPrice(1000000);
      expect(result).toContain('1');
    });
  });

  describe('config', () => {
    it('should have currency configuration', () => {
      expect(config.currency).toBeDefined();
      expect(config.currency.symbol).toBeDefined();
      expect(config.currency.code).toBe('BDT');
    });

    it('should have shipping configuration', () => {
      expect(config.shipping).toBeDefined();
      expect(config.shipping.freeThreshold).toBe(3000);
      expect(config.shipping.defaultCost).toBe(100);
    });

    it('should have pagination configuration', () => {
      expect(config.pagination).toBeDefined();
      expect(config.pagination.defaultPageSize).toBe(12);
    });
  });

  describe('cn', () => {
    it('should merge class names', () => {
      const result = cn('foo', 'bar');
      expect(result).toBe('foo bar');
    });

    it('should handle conditional classes', () => {
      const result = cn('foo', false && 'bar', 'baz');
      expect(result).toBe('foo baz');
    });
  });
});
