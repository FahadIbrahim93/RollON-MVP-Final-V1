import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { addToCart } = useCart();

  const featuredProducts = products.filter((p) => p.featured);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#1d1d1d] noise-overlay overflow-hidden"
    >
      <div className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block text-sm font-medium text-green-400 tracking-widest uppercase mb-4"
            >
              Handpicked For You
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white"
            >
              Featured <span className="gradient-text">Collection</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-white hover:bg-white/5 transition-colors"
              >
                View All Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Products Grid - Asymmetric Masonry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => {
            const isLarge = index === 0;
            const isMedium = index === 2;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 80 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`
                  ${isLarge ? 'sm:col-span-2 sm:row-span-2' : ''}
                  ${isMedium ? 'lg:row-span-2' : ''}
                `}
              >
                <div className="group relative h-full">
                  <motion.div
                    whileHover={{ y: -12 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`
                      relative h-full bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/5
                      ${isLarge ? 'min-h-[500px] lg:min-h-[600px]' : 'min-h-[280px]'}
                      ${isMedium ? 'min-h-[500px] lg:min-h-[580px]' : ''}
                    `}
                  >
                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-4 left-4 z-20">
                        <motion.span
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className={`
                            inline-block px-3 py-1 rounded-full text-xs font-bold
                            ${product.badge.includes('%') 
                              ? 'bg-red-500 text-white' 
                              : 'bg-gradient-to-r from-green-400 to-green-500 text-black'}
                          `}
                        >
                          {product.badge}
                        </motion.span>
                      </div>
                    )}

                    {/* Featured Badge */}
                    {product.featured && !product.badge && (
                      <div className="absolute top-4 left-4 z-20">
                        <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Image */}
                    <Link to={`/product/${product.slug}`} className="block h-[60%]">
                      <div className="relative h-full overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%231d1d1d" width="400" height="400" rx="20"/%3E%3Ctext fill="%234ade80" font-family="sans-serif" font-size="18" font-weight="bold" x="50%25" y="45%25" text-anchor="middle" dominant-baseline="middle"%3E${encodeURIComponent(product.category)}%3C/text%3E%3Ctext fill="%23ffffff" font-family="sans-serif" font-size="14" x="50%25" y="55%25" text-anchor="middle" dominant-baseline="middle"%3E${encodeURIComponent(product.name.substring(0, 20))}%3C/text%3E%3C/svg%3E`;
                          }}
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      {/* Category */}
                      <span className="text-xs text-white/50 uppercase tracking-wider mb-2 block">
                        {product.category}
                      </span>

                      {/* Title */}
                      <Link to={`/product/${product.slug}`}>
                        <h3 className={`
                          font-display font-semibold text-white mb-2 group-hover:text-green-400 transition-colors
                          ${isLarge ? 'text-xl lg:text-2xl' : 'text-lg'}
                        `}>
                          {product.name}
                        </h3>
                      </Link>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-white/20'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-white/50">
                          ({product.reviewCount})
                        </span>
                      </div>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`
                            font-bold text-white
                            ${isLarge ? 'text-xl' : 'text-lg'}
                          `}>
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-white/40 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => addToCart(product)}
                          className="p-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Glow Effect on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-t from-green-400/10 to-transparent" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}