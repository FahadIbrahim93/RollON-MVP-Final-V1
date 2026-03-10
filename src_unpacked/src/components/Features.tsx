import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Truck, HeadphonesIcon, CreditCard } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Only the finest materials and craftsmanship. Every product is carefully selected for excellence.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Same-day delivery in Dhaka. Nationwide shipping with real-time tracking.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Expert Support',
    description: 'Our knowledgeable team is here to help you find the perfect product.',
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    description: '100% safe transactions with multiple payment options and buyer protection.',
  },
];

export function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Diagonal Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ x: '-100%' }}
          animate={isInView ? { x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-gradient-to-br from-[#111] to-transparent"
          style={{
            clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0 100%)',
          }}
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, rotateY: -30 }}
            animate={isInView ? { opacity: 1, rotateY: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative perspective-container"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-3xl blur-[60px] scale-90" />
              
              {/* Image */}
              <motion.div
                whileHover={{ rotateY: 0, rotateX: 0 }}
                initial={{ rotateY: -5, rotateX: 2 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-3xl overflow-hidden border border-white/10"
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: '20px 20px 60px rgba(0,0,0,0.5), 1px 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                <img
                  src="/images/features-lifestyle.jpg"
                  alt="Premium Smoking Accessories"
                  className="w-full h-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="700" viewBox="0 0 600 700"%3E%3Crect fill="%231d1d1d" width="600" height="700" rx="24"/%3E%3Ctext fill="%234ade80" font-family="sans-serif" font-size="32" font-weight="bold" x="50%25" y="45%25" text-anchor="middle" dominant-baseline="middle"%3EPremium%3C/text%3E%3Ctext fill="%23ffffff" font-family="sans-serif" font-size="24" x="50%25" y="55%25" text-anchor="middle" dominant-baseline="middle"%3EExperience%3C/text%3E%3C/svg%3E';
                  }}
                />
              </motion.div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                className="absolute -bottom-6 -right-6 px-6 py-4 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl text-black"
              >
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm font-medium">Happy Customers</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-block text-sm font-medium text-green-400 tracking-widest uppercase mb-4"
              >
                Why Choose Us
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-4xl sm:text-5xl font-display font-bold text-white"
              >
                Why Choose <span className="gradient-text">RollON</span>
              </motion.h2>
            </div>

            {/* Feature Cards */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 100 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + index * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-green-400/30 hover:bg-white/10 transition-all duration-300"
                  >
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-400/20 to-green-500/20 rounded-xl flex items-center justify-center"
                    >
                      <feature.icon className="w-6 h-6 text-green-400" />
                    </motion.div>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-display font-semibold text-white mb-1 group-hover:text-green-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Connecting Lines SVG */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20"
        style={{ zIndex: 1 }}
      >
        <motion.path
          d="M200,300 Q400,200 600,300 T1000,300"
          stroke="rgba(74, 222, 128, 0.3)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, delay: 1 }}
        />
      </svg>
    </section>
  );
}