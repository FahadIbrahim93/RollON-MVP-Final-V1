# RollON - E-Commerce Template

<div align="center">

![RollON Logo](public/assets/logo.svg)

**A configuration-driven e-commerce template for online stores**

[![Live Demo](https://img.shields.io/badge/Live_Demo-RollON-blue?style=for-the-badge&logo=vercel)](https://rollon-delta.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

</div>

## 🎯 Overview

RollON is a modern, configuration-driven e-commerce template built with React, TypeScript, and Tailwind CSS. It's designed to be easily customizable for different businesses while maintaining a single, maintainable codebase.

**Current Demo:** A premium smoking accessories store showcasing vaporizers, grinders, water pipes, and more.

## ✨ Features

- 🎨 **Config-Driven Branding** - Change business identity, colors, and content via a single config file
- 🛍️ **Complete E-Commerce Flow** - Product catalog, cart, checkout, and order confirmation
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ⚡ **Fast & Optimized** - Lazy loading, code splitting, and optimized assets
- 🌙 **Dark Theme** - Modern dark UI with customizable color scheme
- 🔍 **SEO Optimized** - Meta tags, semantic HTML, and structured data
- 📦 **Type-Safe** - Full TypeScript coverage
- 🧩 **Modular Components** - Reusable, well-organized component architecture

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/FahadIbrahim93/RollON-MVP-Final-V1.git
cd RollON-MVP-Final-V1

# Install dependencies
cd rollon-app
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app.

## 🎨 Customization

RollON is designed to be customized for any business. Here's how:

### 1. Update Site Configuration

Edit `rollon-app/src/lib/config.ts`:

```typescript
export const siteConfig: SiteConfig = {
  name: 'Your Business Name',
  tagline: 'Your tagline here',
  description: 'Your business description',
  email: 'your@email.com',
  phone: '+1234567890',
  // ...
};
```

### 2. Update Branding

```typescript
export const brandConfig: BrandConfig = {
  primary: '#your-primary-color',
  secondary: '#your-secondary-color',
  logo: '/assets/your-logo.svg',
  heroTitle: 'Your hero title',
  // ...
};
```

### 3. Update Products

Replace the product data in `rollon-app/src/data/products.ts` with your own products.

### 4. Update Images

Replace images in `public/assets/` with your brand assets.

### 5. Customize Theme

Edit `rollon-app/tailwind.config.js` to change the color scheme and design tokens.

See [docs/TEMPLATE_GUIDE.md](docs/TEMPLATE_GUIDE.md) for a complete customization guide.

## 📁 Project Structure

```
rollon-app/
├── src/
│   ├── components/
│   │   ├── layout/       # Navbar, Footer, etc.
│   │   ├── sections/     # Hero, FeaturedProducts, etc.
│   │   ├── shop/         # ProductCard, etc.
│   │   └── ui/           # Reusable UI components
│   ├── data/             # Product catalog, categories
│   ├── lib/              # Configuration, utilities, API
│   ├── pages/            # Page components
│   ├── store/            # State management (Zustand)
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
└── tailwind.config.js    # Tailwind configuration
```

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Build Tool:** Vite
- **Deployment:** Vercel

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will auto-detect the Vite configuration
4. Deploy!

### Other Platforms

The app builds to a static `dist/` folder that can be deployed anywhere:

```bash
npm run build
```

Serve the `dist/` folder with any static file server.

## 📄 Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [Template Customization Guide](docs/TEMPLATE_GUIDE.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@rollon.com or contact via WhatsApp.

---

<div align="center">

**Built with ❤️ by [Fahad Ibrahim](https://github.com/FahadIbrahim93)**

</div>