import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingCart, Star, ChevronDown, Search } from 'lucide-react';
import { products, categories } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Footer } from '@/components/Footer';

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { addToCart } = useCart();

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24">
      {/* Header */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d1d1d] to-transparent" />
        <div className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block text-sm font-medium text-green-400 tracking-widest uppercase mb-4">
              Explore Collection
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
              Shop <span className="gradient-text">All Products</span>
            </h1>
            <p className="text-white/60 text-lg max-w-md mx-auto">
              Browse our complete collection of premium smoking accessories
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Products */}
      <section ref={sectionRef} className="relative py-8">
        <div className="px-4 sm:px-6 lg:px-12 xl:px-20">
          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row gap-4 mb-8"
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-green-400/50"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSearchParams({})}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSearchParams({ category: cat.slug })}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-gradient-to-r from-green-400 to-green-500 text-black'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-3 pr-10 bg-white/5 border border-white/10 rounded-full text-white text-sm focus:outline-none focus:border-green-400/50 cursor-pointer"
              >
                <option value="featured" className="bg-[#0a0a0a]">Featured</option>
                <option value="price-low" className="bg-[#0a0a0a]">Price: Low to High</option>
                <option value="price-high" className="bg-[#0a0a0a]">Price: High to Low</option>
                <option value="rating" className="bg-[#0a0a0a]">Highest Rated</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/40 text-sm mb-6"
          >
            Showing {sortedProducts.length} products
          </motion.p>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-green-400/30 transition-all duration-300">
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${
                        product.badge.includes('%') ? 'bg-red-500 text-white' : 'bg-green-400 text-black'
                      }`}>
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Image */}
                  <Link to={`/product/${product.slug}`} className="block aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"%3E%3Crect fill="%231d1d1d" width="300" height="300" rx="12"/%3E%3Ctext fill="%234ade80" font-family="sans-serif" font-size="14" font-weight="bold" x="50%25" y="45%25" text-anchor="middle" dominant-baseline="middle"%3E${encodeURIComponent(product.category)}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                  </Link>

                  {/* Content */}
                  <div className="p-4">
                    <span className="text-xs text-white/40 uppercase tracking-wider">{product.category}</span>
                    <Link to={`/product/${product.slug}`}>
                      <h3 className="text-white font-display font-semibold mt-1 mb-2 group-hover:text-green-400 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`}
                        />
                      ))}
                      <span className="text-xs text-white/40 ml-1">({product.reviewCount})</span>
                    </div>

                    {/* Price & Add to Cart */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-white/40 line-through">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToCart(product)}
                        className="p-2 bg-green-400 rounded-full text-black opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {sortedProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-white/60 text-lg">No products found matching your criteria.</p>
              <button
                onClick={() => { setSearchQuery(''); setSearchParams({}); }}
                className="mt-4 px-6 py-3 bg-green-400 rounded-full text-black font-semibold"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}