import { motion } from 'framer-motion';
import { Shield, Cpu, Zap, Activity, Globe, Scale } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';

const pillars = [
  {
    icon: Shield,
    title: 'Absolute Integrity',
    description: 'Every artifact produced in our foundry undergoes rigorous thermal and structural validation. We do not tolerate compromise.',
    accent: 'text-primary'
  },
  {
    icon: Cpu,
    title: 'Neural Engineering',
    description: 'Our designs are optimized through advanced simulations, ensuring peak performance in extreme industrial environments.',
    accent: 'text-blue-500'
  },
  {
    icon: Zap,
    title: 'High-Frequency Flow',
    description: 'We prioritize the seamless transmission of energy and intent. Our tools are extensions of the operator.',
    accent: 'text-orange-500'
  },
  {
    icon: Activity,
    title: 'Bio-Mechanical Synergy',
    description: 'Ergonomics reimagined. We bridge the gap between organic necessity and mechanical precision.',
    accent: 'text-purple-500'
  },
  {
    icon: Globe,
    title: 'Global Dispatch',
    description: 'Precision engineering, delivered worldwide. Our logistics network is as robust as our products.',
    accent: 'text-emerald-500'
  },
  {
    icon: Scale,
    title: 'The Quality Standard',
    description: 'Excellence is not an act, but a habit. We set the benchmark for the next industrial era.',
    accent: 'text-red-500'
  }
];

export function Manifesto() {
  return (
    <main className="min-h-screen bg-[#050505] pt-24 overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50" />
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 sm:px-10 lg:px-24 py-20 lg:py-40">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <Badge variant="outline" className="rounded-full border-primary/20 text-primary tracking-[0.3em] font-black px-6 py-2 bg-primary/5">
                V.4.0 PROTOCOL
              </Badge>
              <h1 className="text-6xl sm:text-8xl lg:text-9xl font-display font-black text-white tracking-tighter leading-[0.8] uppercase italic">
                The Roll<span className="text-primary">ON</span> <br />
                <span className="text-white/20">Manifesto.</span>
              </h1>
              <p className="text-white/60 text-xl md:text-3xl font-light max-w-3xl leading-relaxed">
                We are the architects of the new industrial aesthetic. A collective dedicated to the fusion of high-performance engineering and cybernetic artistry.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pillars Grid */}
        <section className="px-6 sm:px-10 lg:px-24 py-32 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="group space-y-6"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center transition-all duration-500 group-hover:border-primary/50 group-hover:bg-primary/10 ${pillar.accent}`}>
                    <pillar.icon className="w-8 h-8" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight italic group-hover:text-primary transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-white/40 leading-relaxed text-lg font-light">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Philosophy */}
        <section className="px-6 sm:px-10 lg:px-24 py-40">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <h2 className="text-4xl lg:text-6xl font-display font-black text-white tracking-tighter uppercase italic">
              "Foundry Excellence is not a goal, <br />
              <span className="text-primary">It is our Baseline."</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-4">
                <h4 className="text-primary font-black uppercase tracking-widest text-xs">The Vision</h4>
                <p className="text-white/60 leading-relaxed">
                  To redefine the relationship between humans and their tools. We believe that an object of utility should also be an object of immense beauty and technical superiority.
                </p>
              </div>
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-4">
                <h4 className="text-primary font-black uppercase tracking-widest text-xs">The Method</h4>
                <p className="text-white/60 leading-relaxed">
                  We leverage additive manufacturing, computational design, and material science to push the boundaries of what is possible in smoking accessories.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 sm:px-10 lg:px-24 py-32 bg-primary text-black">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="space-y-4 text-center lg:text-left">
                    <h2 className="text-5xl lg:text-7xl font-display font-black tracking-tighter uppercase italic leading-none">
                        Join the <br /> Evolution.
                    </h2>
                    <p className="text-black/60 text-xl font-bold max-w-md">
                        Equip yourself with the future of foundry excellence.
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-20 px-16 bg-black text-primary font-black rounded-full text-2xl tracking-tighter uppercase italic hover:bg-white transition-all shadow-2xl"
                >
                    Explore Shop
                </motion.button>
            </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
