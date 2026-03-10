import { motion } from 'framer-motion';
import { BadgeCheck, Truck, Shield, Headphones } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';

const features = [
  {
    icon: BadgeCheck,
    title: 'Premium Quality',
    description: 'Only authentic, high-quality products sourced from trusted manufacturers worldwide.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Same-day delivery in Dhaka and express shipping nationwide within 2-3 days.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Pay with bKash, Nagad, Rocket, or card. Your transactions are always secure.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    description: '24/7 dedicated support team ready to help with any questions or concerns.',
    color: 'from-green-500 to-emerald-500',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-['Poppins'] text-foreground mb-4">
            Why Choose RollON?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The premier destination for smoking accessories in Bangladesh
          </p>
        </FadeIn>

        {/* Features Grid */}
        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="text-center group"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Stats */}
        <FadeIn delay={0.4} className="mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 p-8 bg-card rounded-2xl border border-border/50">
            {[
              { value: '10K+', label: 'Happy Customers' },
              { value: '500+', label: 'Products' },
              { value: '99%', label: 'Satisfaction Rate' },
              { value: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
