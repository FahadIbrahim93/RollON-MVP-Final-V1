import type { Product, Category, Testimonial, Order, Customer } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Rings',
    slug: 'rings',
    description: 'Bespoke rings crafted for eternity',
    image: 'https://images.unsplash.com/photo-1605100804763-247f673f5424?auto=format&fit=crop&q=80&w=800',
    icon: 'Circle',
    productCount: 42,
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: '2',
    name: 'Necklaces',
    slug: 'necklaces',
    description: 'Elegant statements, close to your heart',
    image: 'https://images.unsplash.com/photo-1599643478524-fb5244098795?auto=format&fit=crop&q=80&w=800',
    icon: 'Link',
    productCount: 28,
    gradient: 'from-amber-400 to-orange-500'
  },
  {
    id: '3',
    name: 'Earrings',
    slug: 'earrings',
    description: 'Subtle grace and classic glamour',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
    icon: 'Sparkles',
    productCount: 35,
    gradient: 'from-rose-400 to-pink-500'
  },
  {
    id: '4',
    name: 'Bracelets',
    slug: 'bracelets',
    description: 'Timeless luxury wrapped around your wrist',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
    icon: 'Activity',
    productCount: 15,
    gradient: 'from-emerald-400 to-teal-500'
  },
  {
    id: '5',
    name: 'Pendants',
    slug: 'pendants',
    description: 'Intricate details that define your style',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=800',
    icon: 'Gem',
    productCount: 22,
    gradient: 'from-purple-400 to-fuchsia-500'
  },
  {
    id: '6',
    name: 'Bridal Sets',
    slug: 'bridal-sets',
    description: 'The ultimate collection for your special day',
    image: 'https://images.unsplash.com/photo-1550184658-ff6132a71714?auto=format&fit=crop&q=80&w=800',
    icon: 'Crown',
    productCount: 8,
    gradient: 'from-slate-400 to-slate-600'
  }
];

export const products: Product[] = [
  {
    id: 'mar-1',
    name: '22K Gold Heritage Necklace',
    slug: 'heritage-gold-necklace',
    description: 'Exquisite 22-karat solid gold necklace featuring traditional Bengali craftsmanship. Perfect for weddings and special occasions, offering a timeless heirloom piece.',
    price: 155000,
    originalPrice: 175000,
    image: 'https://images.unsplash.com/photo-1599643478524-fb5244098795?auto=format&fit=crop&q=80&w=800',
    category: 'Necklaces',
    categoryId: '2',
    tags: ['22k', 'gold', 'wedding', 'necklace'],
    stock: 5,
    inStock: true,
    rating: 5.0,
    reviewCount: 42,
    specifications: {
      'Weight': '24.5 Grams',
      'Purity': '22 Karat (916)',
      'Design': 'Traditional Cut',
    },
    featured: true,
    new: true
  },
  {
    id: 'mar-2',
    name: 'Diamond Solitaire Ring',
    slug: 'diamond-solitaire-ring',
    description: 'Stunning 1.5 carat diamond solitaire ring set in 18K white gold. Brilliant cut diamond with VVS1 clarity, catching light from every angle.',
    price: 280000,
    originalPrice: 310000,
    image: 'https://images.unsplash.com/photo-1605100804763-247f673f5424?auto=format&fit=crop&q=80&w=800',
    category: 'Rings',
    categoryId: '1',
    tags: ['diamond', 'solitaire', 'ring', 'white-gold'],
    stock: 2,
    inStock: true,
    rating: 4.9,
    reviewCount: 12,
    specifications: {
      'Metal': '18K White Gold',
      'Diamond': '1.5 Carat',
      'Clarity': 'VVS1',
      'Cut': 'Brilliant'
    },
    featured: true,
    new: true
  },
  {
    id: 'mar-3',
    name: 'Ruby & Diamond Drop Earrings',
    slug: 'ruby-diamond-drop-earrings',
    description: 'Elegant drop earrings featuring natural rubies surrounded by a halo of brilliant diamonds, crafted in 18K yellow gold.',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
    category: 'Earrings',
    categoryId: '3',
    tags: ['ruby', 'diamond', 'earrings', 'gold'],
    stock: 8,
    inStock: true,
    rating: 4.8,
    reviewCount: 8,
    specifications: {
      'Material': '18K Gold',
      'Stones': 'Ruby, Diamond',
      'Type': 'Drop Earrings',
      'Weight': '8.2 Grams'
    },
    featured: true
  },
  {
    id: 'mar-4',
    name: 'Classic Gold Bangle Set',
    slug: 'classic-gold-bangle-set',
    description: 'Set of four intricately carved 22K solid gold bangles. A staple accessory combining traditional motifs with robust daily-wear durability.',
    price: 210000,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
    category: 'Bracelets',
    categoryId: '4',
    tags: ['bangles', 'gold', 'accessories', '22k'],
    stock: 10,
    inStock: true,
    rating: 4.9,
    reviewCount: 15,
    specifications: {
      'Material': '22K Solid Gold',
      'Quantity': '4 Pieces',
      'Weight': '35 Grams',
      'Design': 'Floral Engraving'
    },
    featured: true
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rahman Ahmed',
    rating: 5,
    quote: 'Amazing quality products! The wooden grinder I ordered exceeded my expectations. Fast delivery across Dhaka.',
  },
  {
    id: '2',
    name: 'Sarah Khan',
    rating: 5,
    quote: 'Best smoking accessories shop in Bangladesh. Love the variety and the prices are reasonable. The glass pieces are artistically made.',
  },
  {
    id: '3',
    name: 'Imran Hossain',
    rating: 4,
    quote: 'Great experience shopping here. The bKash payment was smooth and I got my order quickly. Highly recommend the silicon bongs.',
  }
];

export const orders: Order[] = [
  {
    id: 'fb-order-1',
    orderNumber: 'ORD-MOCK-1',
    customerId: 'fb-customer-1',
    customerName: 'Test User',
    total: 1000,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'cod',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [],
    shippingAddress: {
      name: 'Test',
      address: 'Test',
      city: 'Dhaka',
      phone: '0123456789',
    },
  },
];

export const customers: Customer[] = [
  {
    id: 'fb-customer-1',
    name: 'Test User',
    email: 'test@example.com',
    phone: '0123456789',
    totalSpent: 1000,
    orders: 1,
    createdAt: new Date().toISOString(),
    address: 'Test',
    city: 'Dhaka'
  }
];

export const paymentMethods = [
  { id: 'bkash', name: 'bKash', icon: 'Smartphone', color: '#E2136E' },
  { id: 'nagad', name: 'Nagad', icon: 'Wallet', color: '#F7931E' },
  { id: 'rocket', name: 'Rocket', icon: 'Rocket', color: '#8C3494' },
  { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard', color: '#1E40AF' },
  { id: 'cod', name: 'Cash on Delivery', icon: 'Banknote', color: '#10B981' }
];