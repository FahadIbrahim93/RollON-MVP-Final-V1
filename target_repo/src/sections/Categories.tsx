import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  CircleDot,
  Droplets,
  Scroll,
  Flame,
  Package,
  ArrowRight,
} from 'lucide-react';
import { categories } from '@/lib/data';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';

const iconMap: Record<string, React.ElementType> = {
  Zap,
  CircleDot,
  Droplets,
  Scroll,
  Flame,
  Package,
};

export function Categories() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-['Poppins'] text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find exactly what you&apos;re looking for in our carefully curated
            categories
          </p>
        </FadeIn>

        {/* Grid */}
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Package;
            return (
              <StaggerItem key={category.id}>
                <Link to={`/shop?category=${category.slug}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                  >
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </motion.div>

                      {/* Text */}
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {category.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {category.productCount} products
                        </span>
                        <motion.div
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          className="flex items-center text-primary text-sm font-medium"
                        >
                          Explore
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Decorative Corner */}
                    <div
                      className={`absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${category.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}
                    />
                  </motion.div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
