import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/shop/ProductCard';
import { products } from '@/lib/data';
import { FadeIn } from '@/components/animations/FadeIn';

export function FeaturedProducts() {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Poppins'] text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Handpicked favorites from our collection, chosen for quality and
              popularity
            </p>
          </div>
          <Button variant="outline" className="group" asChild>
            <Link to="/shop">
              View All Products
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </FadeIn>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* New Arrivals Banner */}
        <FadeIn delay={0.4} className="mt-16">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-purple-600 to-pink-500 p-8 sm:p-12"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-30">
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                  backgroundSize: '100% 100%',
                }}
              />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium text-white mb-3">
                  New Arrivals
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Check Out Our Latest Collection
                </h3>
                <p className="text-white/80">
                  Discover the newest additions to our premium smoking accessories
                </p>
              </div>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold"
                asChild
              >
                <Link to="/shop?sort=newest">Shop New Arrivals</Link>
              </Button>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
