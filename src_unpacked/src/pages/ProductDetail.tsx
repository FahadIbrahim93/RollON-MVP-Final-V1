import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ShoppingCart, Star, Truck, Shield, RotateCcw, ChevronLeft, Plus, Minus, Heart, Share2 } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Footer } from '@/components/Footer';

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  if (!product) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-white mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-green-400 hover:underline">Back to Shop</Link>
        </div>
      </main>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 lg:px-12 xl:px-20 py-6">
        <Link to="/shop" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>

      {/* Product Details */}
      <section ref={sectionRef} className="px-4 sm:px-6 lg:px-12 xl:px-20 py-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square bg-[#111] rounded-3xl overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"%3E%3Crect fill="%231d1d1d" width="600" height="600" rx="24"/%3E%3Ctext fill="%234ade80" font-family="sans-serif" font-size="32" font-weight="bold" x="50%25" y="45%25" text-anchor="middle" dominant-baseline="middle"%3E${encodeURIComponent(product.category)}%3C/text%3E%3C/svg%3E';
                }}
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    product.badge.includes('%') ? 'bg-red-500 text-white' : 'bg-green-400 text-black'
                  }`}>
                    {product.badge}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Category */}
            <span className="text-sm text-green-400 uppercase tracking-wider">{product.category}</span>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`}
                  />
                ))}
              </div>
              <span className="text-white/60">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-white">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xl text-white/40 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-white/60 text-lg leading-relaxed">{product.description}</p>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-white/60">Quantity:</span>
              <div className="flex items-center gap-3 bg-white/5 rounded-full px-4 py-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Minus className="w-4 h-4 text-white" />
                </motion.button>
                <span className="text-white w-8 text-center">{quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Plus className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addToCart(product);
                  }
                }}
                className="flex-1 min-w-[200px] py-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full text-black font-semibold flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 border border-white/20 rounded-full text-white hover:bg-white/5 transition-colors"
              >
                <Heart className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 border border-white/20 rounded-full text-white hover:bg-white/5 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              {[
                { icon: Truck, text: 'Free Delivery in Dhaka' },
                { icon: Shield, text: '2-Year Warranty' },
                { icon: RotateCcw, text: '30-Day Returns' },
                { icon: Star, text: 'Premium Quality' },
              ].map((feature) => (
                <div key={feature.text} className="flex items-center gap-3">
                  <feature.icon className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-white/60">{feature.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-12 xl:px-20 py-16 border-t border-white/10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-2xl font-display font-bold text-white mb-8"
          >
            You May Also <span className="gradient-text">Like</span>
          </motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((related, index) => (
              <motion.div
                key={related.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/product/${related.slug}`} className="group block">
                  <div className="aspect-square bg-[#111] rounded-2xl overflow-hidden mb-3">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"%3E%3Crect fill="%231d1d1d" width="300" height="300" rx="12"/%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                  <h3 className="text-white font-medium group-hover:text-green-400 transition-colors line-clamp-1">
                    {related.name}
                  </h3>
                  <p className="text-green-400 font-semibold">{formatPrice(related.price)}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}