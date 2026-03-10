import type { Product, Category, Testimonial, Order, Customer } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Vaporizers',
    slug: 'vaporizers',
    description: 'Premium vaping experience with our curated collection',
    image: '/images/category-vaporizers.jpg',
    icon: 'Zap',
    productCount: 12,
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    id: '2',
    name: 'Grinders',
    slug: 'grinders',
    description: 'Precision grinding tools for the perfect consistency',
    image: '/images/category-grinders.jpg',
    icon: 'CircleDot',
    productCount: 18,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: '3',
    name: 'Water Pipes',
    slug: 'water-pipes',
    description: 'Smooth filtration for a refined experience',
    image: '/images/category-water-pipes.jpg',
    icon: 'Droplets',
    productCount: 15,
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: '4',
    name: 'Rolling Papers',
    slug: 'rolling-papers',
    description: 'Classic collection of premium papers',
    image: '/images/category-rolling-papers.jpg',
    icon: 'Scroll',
    productCount: 24,
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    id: '5',
    name: 'Lighters',
    slug: 'lighters',
    description: 'Reliable ignition tools for every need',
    image: '/images/category-lighters.jpg',
    icon: 'Flame',
    productCount: 20,
    gradient: 'from-red-500 to-orange-500'
  },
  {
    id: '6',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Essential extras to complete your setup',
    image: '/images/category-accessories.jpg',
    icon: 'Package',
    productCount: 30,
    gradient: 'from-emerald-500 to-teal-500'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Design Four-Layer Aluminium Grinder',
    slug: 'classic-aluminium-grinder-65mm',
    description: 'Our grinder has a very strong magnetic cover. Even if it is turned upside down and shaken, it is strong enough to stay firm. The high-quality metal teeth have excellent durability for efficient grinding.',
    price: 1200,
    originalPrice: 1500,
    image: '/images/grinder-aluminium.jpg',
    category: 'Grinders',
    categoryId: '2',
    tags: ['grinder', 'aluminium', '4-layer', '65mm'],
    stock: 25,
    inStock: true,
    rating: 4.8,
    reviewCount: 42,
    specifications: {
      'Material': 'Aluminium',
      'Diameter': '65mm',
      'Layers': '4',
      'Weight': '180g'
    },
    featured: true
  },
  {
    id: '2',
    name: 'Space Case 4-Part 60mm Aluminum Grinder',
    slug: 'space-case-grinder-60mm',
    description: 'Space Case 4 part 60mm aluminum Grinders are an investment that are built to last a lifetime. Featuring grinding teeth that never dull and a screen that doesn\'t clog.',
    price: 2500,
    image: '/images/grinder-space-case.jpg',
    category: 'Grinders',
    categoryId: '2',
    tags: ['grinder', 'space case', 'aluminum', 'premium'],
    stock: 15,
    inStock: true,
    rating: 4.9,
    reviewCount: 28,
    specifications: {
      'Material': 'Aerospace Aluminum',
      'Diameter': '60mm',
      'Layers': '4',
      'Made in': 'USA'
    },
    featured: true
  },
  {
    id: '3',
    name: 'Premium Dry Herb Vaporizer',
    slug: 'premium-dry-herb-vaporizer',
    description: 'Experience the ultimate vaping session with our premium dry herb vaporizer. Features precise temperature control, fast heat-up time, and long-lasting battery.',
    price: 8500,
    salePrice: 7200,
    image: '/images/vaporizer-dry-herb.jpg',
    category: 'Vaporizers',
    categoryId: '1',
    tags: ['vaporizer', 'dry herb', 'digital', 'premium'],
    stock: 10,
    inStock: true,
    rating: 4.7,
    reviewCount: 35,
    specifications: {
      'Temperature Range': '320-430F',
      'Battery': '3000mAh',
      'Heat-up Time': '30 seconds',
      'Charging': 'USB-C'
    },
    featured: true
  },
  {
    id: '4',
    name: 'OCB Organic Hemp Rolling Papers',
    slug: 'ocb-organic-hemp-papers',
    description: 'Natural unbleached organic hemp rolling papers. Slow-burning, ultra-thin papers for a smooth smoking experience.',
    price: 250,
    image: '/images/papers-ocb.jpg',
    category: 'Rolling Papers',
    categoryId: '4',
    tags: ['papers', 'ocb', 'organic', 'hemp'],
    stock: 100,
    inStock: true,
    rating: 4.6,
    reviewCount: 89,
    specifications: {
      'Material': 'Organic Hemp',
      'Size': '1 1/4',
      'Leaves per pack': '50',
      'Origin': 'France'
    },
    featured: true
  },
  {
    id: '5',
    name: 'RAW Classic King Size Slim',
    slug: 'raw-classic-king-size',
    description: 'The classic RAW rolling papers in king size slim. Natural unrefined papers with RAW\'s signature criss-cross watermark.',
    price: 180,
    image: '/images/papers-raw.jpg',
    category: 'Rolling Papers',
    categoryId: '4',
    tags: ['papers', 'raw', 'classic', 'king size'],
    stock: 150,
    inStock: true,
    rating: 4.8,
    reviewCount: 156,
    specifications: {
      'Material': 'Natural Unrefined',
      'Size': 'King Size Slim',
      'Leaves per pack': '32',
      'Origin': 'Spain'
    },
    featured: false
  },
  {
    id: '6',
    name: 'Clipper Refillable Lighter',
    slug: 'clipper-refillable-lighter',
    description: 'The iconic Clipper lighter with its classic round design. Refillable gas and replaceable flint make it an eco-friendly choice.',
    price: 450,
    image: '/images/lighter-clipper.jpg',
    category: 'Lighters',
    categoryId: '5',
    tags: ['lighter', 'clipper', 'refillable', 'classic'],
    stock: 60,
    inStock: true,
    rating: 4.7,
    reviewCount: 73,
    specifications: {
      'Type': 'Flint Wheel',
      'Fuel': 'Butane',
      'Refillable': 'Yes',
      'Made in': 'Spain'
    },
    featured: true
  },
  {
    id: '7',
    name: 'Electric Arc Plasma Lighter',
    slug: 'electric-arc-lighter',
    description: 'Modern USB rechargeable plasma lighter. Windproof, flameless design with LED indicator. Perfect for outdoor use.',
    price: 1200,
    salePrice: 950,
    image: '/images/lighter-electric.jpg',
    category: 'Lighters',
    categoryId: '5',
    tags: ['lighter', 'electric', 'plasma', 'usb rechargeable'],
    stock: 40,
    inStock: true,
    rating: 4.5,
    reviewCount: 48,
    specifications: {
      'Type': 'Plasma Arc',
      'Battery': '280mAh',
      'Charging': 'USB',
      'Windproof': 'Yes'
    },
    featured: true,
    new: true
  },
  {
    id: '8',
    name: '5 Inch Mini Silicone Water Pipe',
    slug: 'mini-silicone-water-pipe',
    description: 'Portable 5 inch unbreakable silicone water pipe with detachable design. Perfect for travel and outdoor adventures.',
    price: 1750,
    image: '/images/bong-mini-silicone.jpg',
    category: 'Water Pipes',
    categoryId: '3',
    tags: ['water pipe', 'silicone', 'portable', 'unbreakable'],
    stock: 30,
    inStock: true,
    rating: 4.6,
    reviewCount: 52,
    specifications: {
      'Material': 'Food-grade Silicone',
      'Height': '5 inch',
      'Bowl': 'Glass',
      'Detachable': 'Yes'
    },
    featured: true
  },
  {
    id: '9',
    name: 'Zippo Classic Windproof Lighter',
    slug: 'zippo-classic-lighter',
    description: 'The legendary Zippo windproof lighter. Iconic design, lifetime guarantee, and that satisfying click. Made in USA.',
    price: 3500,
    image: '/images/lighter-zippo.jpg',
    category: 'Lighters',
    categoryId: '5',
    tags: ['lighter', 'zippo', 'windproof', 'classic'],
    stock: 20,
    inStock: true,
    rating: 4.9,
    reviewCount: 67,
    specifications: {
      'Type': 'Flint Wheel',
      'Fuel': 'Zippo Fluid',
      'Made in': 'USA',
      'Warranty': 'Lifetime'
    },
    featured: true
  },
  {
    id: '10',
    name: 'Portable Vape Pen Starter Kit',
    slug: 'portable-vape-pen-kit',
    description: 'Slim and discreet vape pen starter kit. Perfect for beginners with easy one-button operation and USB charging.',
    price: 2800,
    salePrice: 2200,
    image: '/images/vape-pen-portable.jpg',
    category: 'Vaporizers',
    categoryId: '1',
    tags: ['vape pen', 'starter kit', 'portable', 'beginner'],
    stock: 35,
    inStock: true,
    rating: 4.4,
    reviewCount: 41,
    specifications: {
      'Battery': '650mAh',
      'Charging': 'USB',
      'Tank Capacity': '1.6ml',
      'Coil': '1.6ohm'
    },
    featured: false,
    new: true
  },
  {
    id: '11',
    name: 'Bamboo Rolling Tray Large',
    slug: 'bamboo-rolling-tray',
    description: 'Eco-friendly bamboo rolling tray with smooth finish and raised edges. Perfect size for rolling with compartments for accessories.',
    price: 850,
    image: '/images/tray-wooden.jpg',
    category: 'Accessories',
    categoryId: '6',
    tags: ['tray', 'bamboo', 'rolling', 'eco-friendly'],
    stock: 45,
    inStock: true,
    rating: 4.7,
    reviewCount: 38,
    specifications: {
      'Material': 'Bamboo',
      'Size': 'Large (28x18cm)',
      'Finish': 'Natural',
      'Features': 'Raised edges'
    },
    featured: true
  },
  {
    id: '12',
    name: 'Amber Glass Storage Jar 250ml',
    slug: 'amber-glass-storage-jar',
    description: 'UV-protected amber glass jar with airtight bamboo lid. Keeps herbs fresh and preserves potency. Smell-proof design.',
    price: 650,
    image: '/images/jar-storage.jpg',
    category: 'Accessories',
    categoryId: '6',
    tags: ['jar', 'storage', 'glass', 'uv-protected'],
    stock: 55,
    inStock: true,
    rating: 4.8,
    reviewCount: 62,
    specifications: {
      'Material': 'Amber Glass',
      'Capacity': '250ml',
      'Lid': 'Bamboo',
      'Features': 'UV Protection'
    },
    featured: false
  },
  {
    id: '13',
    name: 'Digital Pocket Scale 0.01g Precision',
    slug: 'digital-pocket-scale',
    description: 'High-precision digital scale with 0.01g accuracy. Backlit LCD display, stainless steel platform, and auto-calibration.',
    price: 1200,
    salePrice: 950,
    image: '/images/scale-digital.jpg',
    category: 'Accessories',
    categoryId: '6',
    tags: ['scale', 'digital', 'precision', 'pocket'],
    stock: 40,
    inStock: true,
    rating: 4.6,
    reviewCount: 29,
    specifications: {
      'Precision': '0.01g',
      'Max Weight': '200g',
      'Display': 'LCD Backlit',
      'Power': 'AAA Batteries'
    },
    featured: true
  },
  {
    id: '14',
    name: 'Automatic Cigarette Rolling Machine',
    slug: 'automatic-rolling-machine',
    description: 'Electric automatic rolling machine for perfect cigarettes every time. Easy to use with adjustable density settings.',
    price: 2200,
    image: '/images/roller-machine.jpg',
    category: 'Accessories',
    categoryId: '6',
    tags: ['roller', 'automatic', 'electric', 'machine'],
    stock: 18,
    inStock: true,
    rating: 4.5,
    reviewCount: 22,
    specifications: {
      'Type': 'Electric',
      'Power': 'Battery/USB',
      'Compatibility': 'Standard papers',
      'Features': 'Adjustable density'
    },
    featured: false
  },
  {
    id: '15',
    name: 'Hand-Blown Glass Spoon Pipe',
    slug: 'glass-spoon-pipe',
    description: 'Beautiful hand-blown glass spoon pipe with unique swirled colors. Each piece is one-of-a-kind. Thick borosilicate glass.',
    price: 1500,
    image: '/images/pipe-glass-spoon.jpg',
    category: 'Water Pipes',
    categoryId: '3',
    tags: ['pipe', 'glass', 'spoon', 'hand-blown'],
    stock: 22,
    inStock: true,
    rating: 4.7,
    reviewCount: 33,
    specifications: {
      'Material': 'Borosilicate Glass',
      'Length': '4 inch',
      'Style': 'Spoon',
      'Features': 'Hand-blown'
    },
    featured: true,
    new: true
  },
  {
    id: '16',
    name: 'Wooden Dugout with Metal Bat',
    slug: 'wooden-dugout-kit',
    description: 'Classic wooden dugout with sliding lid and included metal bat pipe. Discreet and portable for on-the-go use.',
    price: 1100,
    image: '/images/dugout-wooden.jpg',
    category: 'Accessories',
    categoryId: '6',
    tags: ['dugout', 'wooden', 'bat', 'portable'],
    stock: 28,
    inStock: true,
    rating: 4.4,
    reviewCount: 19,
    specifications: {
      'Material': 'Wood',
      'Includes': 'Metal bat pipe',
      'Lid': 'Sliding',
      'Size': 'Compact'
    },
    featured: false
  },
  {
    id: '17',
    name: 'Concentrate Vaporizer Pen',
    slug: 'concentrate-vaporizer-pen',
    description: 'Premium concentrate vaporizer with ceramic coil and variable voltage. Sleek design with preheat function.',
    price: 4500,
    salePrice: 3800,
    image: '/images/vaporizer-concentrate.jpg',
    category: 'Vaporizers',
    categoryId: '1',
    tags: ['vaporizer', 'concentrate', 'ceramic', 'variable voltage'],
    stock: 15,
    inStock: true,
    rating: 4.8,
    reviewCount: 27,
    specifications: {
      'Coil': 'Ceramic',
      'Voltage': 'Variable (3.3-4.8V)',
      'Battery': '900mAh',
      'Features': 'Preheat function'
    },
    featured: true
  },
  {
    id: '18',
    name: 'Premium Glass Water Pipe 12"',
    slug: 'premium-glass-bong-12inch',
    description: 'High-quality borosilicate glass water pipe with beaker base, ice catcher, and removable downstem. Smooth hits guaranteed.',
    price: 5500,
    image: '/images/bong-glass-premium.jpg',
    category: 'Water Pipes',
    categoryId: '3',
    tags: ['water pipe', 'glass', 'beaker', 'ice catcher'],
    stock: 12,
    inStock: true,
    rating: 4.9,
    reviewCount: 45,
    specifications: {
      'Material': 'Borosilicate Glass',
      'Height': '12 inch',
      'Base': 'Beaker',
      'Features': 'Ice Catcher'
    },
    featured: true
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rahman Ahmed',
    rating: 5,
    quote: 'Amazing quality products! The grinder I ordered exceeded my expectations. Fast delivery in Dhaka and excellent customer service.',
  },
  {
    id: '2',
    name: 'Sarah Khan',
    rating: 5,
    quote: 'Best smoking accessories shop in Bangladesh. Love the variety and the prices are reasonable. The vaporizer works perfectly!',
  },
  {
    id: '3',
    name: 'Imran Hossain',
    rating: 4,
    quote: 'Great experience shopping here. The bKash payment was smooth and I got my order the next day. Will definitely order again.',
  },
  {
    id: '4',
    name: 'Nadia Islam',
    rating: 5,
    quote: 'The silicone water pipe is unbreakable as advertised! Perfect for parties. Thanks RollON for the quality products.',
  },
  {
    id: '5',
    name: 'Kamal Hassan',
    rating: 5,
    quote: 'Been buying from RollON for months now. Always satisfied with the products and delivery. Highly recommended!',
  }
];

export const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'RON-2026-001',
    customerId: '1',
    customerName: 'Rahman Ahmed',
    items: [
      { name: 'Classic Design Four-Layer Aluminium Grinder', price: 1200, quantity: 1, image: '/images/grinder-aluminium.jpg' }
    ],
    total: 1200,
    status: 'delivered',
    paymentStatus: 'completed',
    paymentMethod: 'bKash',
    shippingAddress: {
      name: 'Rahman Ahmed',
      phone: '01712345678',
      address: 'House 12, Road 5, Dhanmondi',
      city: 'Dhaka'
    },
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-03T14:00:00Z'
  },
  {
    id: '2',
    orderNumber: 'RON-2026-002',
    customerId: '2',
    customerName: 'Sarah Khan',
    items: [
      { name: 'Premium Dry Herb Vaporizer', price: 7200, quantity: 1, image: '/images/vaporizer-dry-herb.jpg' },
      { name: 'OCB Organic Hemp Rolling Papers', price: 250, quantity: 2, image: '/images/papers-ocb.jpg' }
    ],
    total: 7700,
    status: 'processing',
    paymentStatus: 'completed',
    paymentMethod: 'Nagad',
    shippingAddress: {
      name: 'Sarah Khan',
      phone: '01812345678',
      address: 'Flat 4B, Gulshan Avenue',
      city: 'Dhaka'
    },
    createdAt: '2026-03-05T08:30:00Z',
    updatedAt: '2026-03-05T08:30:00Z'
  },
  {
    id: '3',
    orderNumber: 'RON-2026-003',
    customerId: '3',
    customerName: 'Imran Hossain',
    items: [
      { name: 'Clipper Refillable Lighter', price: 450, quantity: 3, image: '/images/lighter-clipper.jpg' }
    ],
    total: 1350,
    status: 'shipped',
    paymentStatus: 'completed',
    paymentMethod: 'Rocket',
    shippingAddress: {
      name: 'Imran Hossain',
      phone: '01912345678',
      address: 'House 45, Sector 7, Uttara',
      city: 'Dhaka'
    },
    createdAt: '2026-03-04T16:00:00Z',
    updatedAt: '2026-03-06T09:00:00Z'
  },
  {
    id: '4',
    orderNumber: 'RON-2026-004',
    customerId: '4',
    customerName: 'Nadia Islam',
    items: [
      { name: '5 Inch Mini Silicone Water Pipe', price: 1750, quantity: 1, image: '/images/bong-mini-silicone.jpg' },
      { name: 'RAW Classic King Size Slim', price: 180, quantity: 5, image: '/images/papers-raw.jpg' }
    ],
    total: 2650,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'cod',
    shippingAddress: {
      name: 'Nadia Islam',
      phone: '01612345678',
      address: 'House 23, Road 7, Banani',
      city: 'Dhaka'
    },
    createdAt: '2026-03-06T11:00:00Z',
    updatedAt: '2026-03-06T11:00:00Z'
  },
  {
    id: '5',
    orderNumber: 'RON-2026-005',
    customerId: '5',
    customerName: 'Kamal Hassan',
    items: [
      { name: 'Zippo Classic Windproof Lighter', price: 3500, quantity: 1, image: '/images/lighter-zippo.jpg' }
    ],
    total: 3500,
    status: 'delivered',
    paymentStatus: 'completed',
    paymentMethod: 'card',
    shippingAddress: {
      name: 'Kamal Hassan',
      phone: '01512345678',
      address: 'Flat 12A, Mirpur Road',
      city: 'Dhaka'
    },
    createdAt: '2026-02-25T14:00:00Z',
    updatedAt: '2026-02-28T10:00:00Z'
  }
];

export const customers: Customer[] = [
  {
    id: '1',
    name: 'Rahman Ahmed',
    email: 'rahman@example.com',
    phone: '01712345678',
    address: 'House 12, Road 5, Dhanmondi, Dhaka',
    city: 'Dhaka',
    orders: 3,
    totalSpent: 4500,
    createdAt: '2026-01-15'
  },
  {
    id: '2',
    name: 'Sarah Khan',
    email: 'sarah@example.com',
    phone: '01812345678',
    address: 'Flat 4B, Gulshan Avenue, Dhaka',
    city: 'Dhaka',
    orders: 5,
    totalSpent: 12500,
    createdAt: '2026-01-10'
  },
  {
    id: '3',
    name: 'Imran Hossain',
    email: 'imran@example.com',
    phone: '01912345678',
    address: 'House 45, Sector 7, Uttara, Dhaka',
    city: 'Dhaka',
    orders: 2,
    totalSpent: 2800,
    createdAt: '2026-02-01'
  },
  {
    id: '4',
    name: 'Nadia Islam',
    email: 'nadia@example.com',
    phone: '01612345678',
    address: 'House 23, Road 7, Banani, Dhaka',
    city: 'Dhaka',
    orders: 4,
    totalSpent: 6800,
    createdAt: '2026-01-20'
  },
  {
    id: '5',
    name: 'Kamal Hassan',
    email: 'kamal@example.com',
    phone: '01512345678',
    address: 'Flat 12A, Mirpur Road, Dhaka',
    city: 'Dhaka',
    orders: 6,
    totalSpent: 15200,
    createdAt: '2025-12-15'
  }
];

export const paymentMethods = [
  { id: 'bkash', name: 'bKash', icon: 'Smartphone', color: '#E2136E' },
  { id: 'nagad', name: 'Nagad', icon: 'Wallet', color: '#F7931E' },
  { id: 'rocket', name: 'Rocket', icon: 'Rocket', color: '#8C3494' },
  { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard', color: '#1E40AF' },
  { id: 'cod', name: 'Cash on Delivery', icon: 'Banknote', color: '#10B981' }
];