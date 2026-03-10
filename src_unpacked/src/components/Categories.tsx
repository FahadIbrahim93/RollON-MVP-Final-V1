import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/products';

export function Categories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="categories"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(at 20% 30%, rgba(74, 222, 128, 0.08) 0%, transparent 50%), radial-gradient(at 80% 70%, rgba(34, 197, 94, 0.06) 0%, transparent 50%), radial-gradient(at 50% 50%, rgba(125, 211, 252, 0.04) 0%, transparent 60%), #0a0a0a',
              'radial-gradient(at 30% 40%, rgba(74, 222, 128, 0.06) 0%, transparent 50%), radial-gradient(at 70% 60%, rgba(34, 197, 94, 0.08) 0%, transparent 50%), radial-gradient(at 40% 70%, rgba(125, 211, 252, 0.05) 0%, transparent 60%), #0a0a0a',
              'radial-gradient(at 20% 30%, rgba(74, 222, 128, 0.08) 0%, transparent 50%), radial-gradient(at 80% 70%, rgba(34, 197, 94, 0.06) 0%, transparent 50%), radial-gradient(at 50% 50%, rgba(125, 211, 252, 0.04) 0%, transparent 60%), #0a0a0a',
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0"
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm font-medium text-green-400 tracking-widest uppercase mb-4"
          >
            Browse Collection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-4"
          >
            Shop by <span className="gradient-text">Category</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-lg max-w-md mx-auto"
          >
            Find exactly what you&apos;re looking for in our curated categories
          </motion.p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 60, rotate: index % 2 === 0 ? -5 : 5 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: (index - 2) * 1 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.3 + index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link to={`/shop?category=${category.slug}`}>
                <motion.div
                  whileHover={{ y: -20, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect fill="%231d1d1d" width="400" height="500" rx="20"/%3E%3Ctext fill="%234ade80" font-family="sans-serif" font-size="24" font-weight="bold" x="50%25" y="45%25" text-anchor="middle" dominant-baseline="middle"%3E${encodeURIComponent(category.name)}%3C/text%3E%3Ctext fill="%236b7280" font-family="sans-serif" font-size="14" x="50%25" y="55%25" text-anchor="middle" dominant-baseline="middle"%3E${category.productCount} products%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <span className="text-sm text-white/60 mb-2 block">
                        {category.productCount} products
                      </span>
                      <h3 className="text-2xl font-display font-bold text-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-white/60 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                        {category.description}
                      </p>
                      <div className="flex items-center gap-2 text-green-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <span className="text-sm font-medium">Explore</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-green-400/20 to-transparent" />
                  </div>

                  {/* Border Glow on Hover */}
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-green-400/30 transition-colors duration-500" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}