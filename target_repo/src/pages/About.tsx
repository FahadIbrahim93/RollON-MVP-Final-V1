import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Shield, Truck, Headphones, Award, Users, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { Footer } from '@/sections/Footer';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';

const values = [
  {
    icon: Shield,
    title: 'Quality First',
    description: 'We only stock products from trusted manufacturers that meet our strict quality standards.'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Same-day delivery in Dhaka and quick shipping nationwide to get your products to you fast.'
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    description: 'Our dedicated team is available 24/7 to answer your questions and resolve any issues.'
  },
  {
    icon: Award,
    title: 'Authentic Products',
    description: 'Every product we sell is 100% authentic and backed by manufacturer warranties.'
  }
];

const milestones = [
  { year: '2023', title: 'Founded', description: 'RollON was established in Dhaka with a mission to provide premium smoking accessories.' },
  { year: '2024', title: '1,000+ Customers', description: 'Reached our first milestone of 1,000 satisfied customers across Bangladesh.' },
  { year: '2024', title: 'Expanded Catalog', description: 'Added 200+ new products including premium vaporizers and imported accessories.' },
  { year: '2025', title: '10,000+ Customers', description: 'Celebrated serving over 10,000 customers with a 99% satisfaction rate.' }
];

export function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-pink-500/20" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <FadeIn className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Flame className="h-10 w-10 text-orange-500" />
                <span className="text-4xl font-bold font-['Poppins']">
                  Roll<span className="text-orange-500">ON</span>
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold font-['Poppins'] text-foreground mb-6">
                Bangladesh&apos;s Premier Smoking Accessories Store
              </h1>
              <p className="text-lg text-muted-foreground">
                We&apos;re on a mission to provide the highest quality smoking accessories 
                to enthusiasts across Bangladesh. From premium vaporizers to classic rolling papers, 
                we curate only the best products for our customers.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <h2 className="text-3xl font-bold font-['Poppins'] text-foreground mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    RollON was founded in 2023 with a simple vision: to make premium smoking 
                    accessories accessible to everyone in Bangladesh. What started as a small 
                    online store has grown into one of the country&apos;s most trusted destinations 
                    for quality smoking products.
                  </p>
                  <p>
                    We believe that everyone deserves access to high-quality, authentic products. 
                    That&apos;s why we work directly with manufacturers and authorized distributors 
                    to bring you the best selection at competitive prices.
                  </p>
                  <p>
                    Our team is passionate about what we do. We test every product before adding 
                    it to our catalog, ensuring that you receive only items that meet our strict 
                    quality standards.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-card rounded-2xl p-6 text-center">
                      <p className="text-4xl font-bold text-gradient">10K+</p>
                      <p className="text-sm text-muted-foreground mt-1">Happy Customers</p>
                    </div>
                    <div className="bg-card rounded-2xl p-6 text-center">
                      <p className="text-4xl font-bold text-gradient">500+</p>
                      <p className="text-sm text-muted-foreground mt-1">Products</p>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="bg-card rounded-2xl p-6 text-center">
                      <p className="text-4xl font-bold text-gradient">99%</p>
                      <p className="text-sm text-muted-foreground mt-1">Satisfaction</p>
                    </div>
                    <div className="bg-card rounded-2xl p-6 text-center">
                      <p className="text-4xl font-bold text-gradient">24/7</p>
                      <p className="text-sm text-muted-foreground mt-1">Support</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl font-bold font-['Poppins'] text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                These core principles guide everything we do at RollON
              </p>
            </FadeIn>

            <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <StaggerItem key={value.title}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-card rounded-2xl p-6 h-full"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl font-bold font-['Poppins'] text-foreground mb-4">
                Our Journey
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Key milestones in our growth story
              </p>
            </FadeIn>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border hidden lg:block" />
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <FadeIn key={milestone.year} delay={index * 0.1}>
                    <div className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="flex-1 text-center lg:text-right">
                        {index % 2 === 0 && (
                          <>
                            <p className="text-2xl font-bold text-primary">{milestone.year}</p>
                            <h3 className="font-semibold text-lg mt-1">{milestone.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                          </>
                        )}
                      </div>
                      <div className="w-4 h-4 rounded-full bg-primary relative z-10" />
                      <div className="flex-1 text-center lg:text-left">
                        {index % 2 === 1 && (
                          <>
                            <p className="text-2xl font-bold text-primary">{milestone.year}</p>
                            <h3 className="font-semibold text-lg mt-1">{milestone.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-20 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <h2 className="text-3xl font-bold font-['Poppins'] text-foreground mb-6">
                  Visit Our Store
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">
                        House 12, Road 5, Dhanmondi<br />
                        Dhaka 1205, Bangladesh
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-muted-foreground">
                        Saturday - Thursday: 10:00 AM - 10:00 PM<br />
                        Friday: Closed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">What We Offer</p>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• In-store product demonstrations</li>
                        <li>• Expert advice and recommendations</li>
                        <li>• Same-day pickup for online orders</li>
                        <li>• Exclusive in-store promotions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="bg-card rounded-2xl p-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    Can&apos;t visit in person? We deliver nationwide!
                  </p>
                  <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600" asChild>
                    <Link to="/shop">
                      Shop Online
                    </Link>
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold font-['Poppins'] text-foreground mb-4">
                Ready to Experience RollON?
              </h2>
              <p className="text-muted-foreground mb-8">
                Browse our collection of premium smoking accessories and discover why 
                thousands of customers trust us for their needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600" asChild>
                  <Link to="/shop">Shop Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
