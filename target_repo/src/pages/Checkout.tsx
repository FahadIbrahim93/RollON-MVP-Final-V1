import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Check,
  CreditCard,
  Smartphone,
  Wallet,
  Rocket,
  Banknote,
  Truck,
  MapPin,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/sections/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCartStore } from '@/store/cartStore';
import { FadeIn } from '@/components/animations/FadeIn';
import { toast } from 'sonner';

const paymentMethods = [
  { id: 'bkash', name: 'bKash', icon: Smartphone, color: '#E2136E' },
  { id: 'nagad', name: 'Nagad', icon: Wallet, color: '#F7931E' },
  { id: 'rocket', name: 'Rocket', icon: Rocket, color: '#8C3494' },
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, color: '#1E40AF' },
  { id: 'cod', name: 'Cash on Delivery', icon: Banknote, color: '#10B981' },
];

const deliveryZones = [
  { name: 'Inside Dhaka', cost: 80 },
  { name: 'Outside Dhaka', cost: 150 },
];

export function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Dhaka',
    zone: 'Inside Dhaka',
    paymentMethod: 'bkash',
  });

  const total = totalPrice();
  const shipping =
    deliveryZones.find((z) => z.name === formData.zone)?.cost || 80;
  const grandTotal = total + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success('Order placed successfully!');
    clearCart();
    navigate('/order-success');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <Button asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <FadeIn>
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/cart">
                  <ChevronLeft className="h-5 w-5" />
                </Link>
              </Button>
              <h1 className="text-2xl sm:text-3xl font-bold font-['Poppins']">
                Checkout
              </h1>
            </div>
          </FadeIn>

          {/* Progress */}
          <FadeIn delay={0.1}>
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-4">
                {['Shipping', 'Payment', 'Review'].map((s, i) => (
                  <div key={s} className="flex items-center gap-4">
                    <div
                      className={`flex items-center gap-2 ${
                        step >= i + 1 ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          step >= i + 1
                            ? 'bg-primary text-white'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {step > i + 1 ? <Check className="h-4 w-4" /> : i + 1}
                      </div>
                      <span className="hidden sm:inline text-sm font-medium">
                        {s}
                      </span>
                    </div>
                    {i < 2 && (
                      <div
                        className={`w-12 h-0.5 ${
                          step > i + 1 ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Step 1: Shipping */}
                {step === 1 && (
                  <FadeIn>
                    <div className="bg-card rounded-2xl border border-border/50 p-6">
                      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Shipping Information
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            required
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="01XXXXXXXXX"
                            required
                            className="mt-1"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <Label htmlFor="address">Address *</Label>
                          <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="House, Road, Area"
                            required
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Dhaka"
                            required
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label>Delivery Zone *</Label>
                          <RadioGroup
                            value={formData.zone}
                            onValueChange={(value) =>
                              setFormData({ ...formData, zone: value })
                            }
                            className="mt-2 space-y-2"
                          >
                            {deliveryZones.map((zone) => (
                              <div
                                key={zone.name}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem
                                  value={zone.name}
                                  id={zone.name}
                                />
                                <Label
                                  htmlFor={zone.name}
                                  className="flex-1 cursor-pointer"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                      <Truck className="h-4 w-4" />
                                      {zone.name}
                                    </span>
                                    <span>৳{zone.cost}</span>
                                  </div>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </div>

                      <Button
                        type="button"
                        className="w-full mt-6"
                        onClick={() => setStep(2)}
                        disabled={
                          !formData.name ||
                          !formData.email ||
                          !formData.phone ||
                          !formData.address
                        }
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </FadeIn>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                  <FadeIn>
                    <div className="bg-card rounded-2xl border border-border/50 p-6">
                      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                        Payment Method
                      </h2>

                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) =>
                          setFormData({ ...formData, paymentMethod: value })
                        }
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        {paymentMethods.map((method) => (
                          <div key={method.id}>
                            <RadioGroupItem
                              value={method.id}
                              id={method.id}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={method.id}
                              className="flex items-center gap-3 p-4 rounded-lg border border-border cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:bg-muted"
                            >
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${method.color}20` }}
                              >
                                <method.icon
                                  className="h-5 w-5"
                                  style={{ color: method.color }}
                                />
                              </div>
                              <span className="font-medium">{method.name}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>

                      <div className="flex gap-4 mt-6">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={() => setStep(1)}
                        >
                          Back
                        </Button>
                        <Button
                          type="button"
                          className="flex-1"
                          onClick={() => setStep(3)}
                        >
                          Review Order
                        </Button>
                      </div>
                    </div>
                  </FadeIn>
                )}

                {/* Step 3: Review */}
                {step === 3 && (
                  <FadeIn>
                    <div className="space-y-6">
                      {/* Order Items */}
                      <div className="bg-card rounded-2xl border border-border/50 p-6">
                        <h2 className="text-lg font-semibold mb-4">Order Items</h2>
                        <div className="space-y-4">
                          {items.map((item) => (
                            <div key={item.productId} className="flex gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                              <p className="font-medium">
                                ৳{(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Info */}
                      <div className="bg-card rounded-2xl border border-border/50 p-6">
                        <h2 className="text-lg font-semibold mb-4">
                          Shipping Address
                        </h2>
                        <div className="text-muted-foreground">
                          <p className="font-medium text-foreground">
                            {formData.name}
                          </p>
                          <p>{formData.phone}</p>
                          <p>{formData.address}</p>
                          <p>
                            {formData.city}, {formData.zone}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="mt-2"
                          onClick={() => setStep(1)}
                        >
                          Edit
                        </Button>
                      </div>

                      {/* Payment Method */}
                      <div className="bg-card rounded-2xl border border-border/50 p-6">
                        <h2 className="text-lg font-semibold mb-4">
                          Payment Method
                        </h2>
                        <p className="flex items-center gap-2">
                          {paymentMethods.find(
                            (m) => m.id === formData.paymentMethod
                          )?.name || 'bKash'}
                        </p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="mt-2"
                          onClick={() => setStep(2)}
                        >
                          Edit
                        </Button>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={() => setStep(2)}
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: 'linear',
                              }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                          ) : (
                            `Place Order - ৳${grandTotal.toLocaleString()}`
                          )}
                        </Button>
                      </div>
                    </div>
                  </FadeIn>
                )}
              </div>

              {/* Order Summary */}
              <FadeIn delay={0.2}>
                <div className="bg-card rounded-2xl border border-border/50 p-6 sticky top-24">
                  <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Subtotal ({items.length} items)
                      </span>
                      <span>৳{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>৳{shipping}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-primary">
                        ৳{grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-border space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-green-500" />
                      Secure checkout
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-green-500" />
                      Fast delivery
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-green-500" />
                      Easy returns
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
