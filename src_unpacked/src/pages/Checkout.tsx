import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, Check, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Footer } from '@/components/Footer';

export function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsProcessing(true);
      // Simulate processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsProcessing(false);
      setIsComplete(true);
      clearCart();
    }
  };

  if (items.length === 0 && !isComplete) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-white mb-4">Your cart is empty</h1>
          <Link to="/shop" className="text-green-400 hover:underline">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  if (isComplete) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4"
        >
          <div className="w-24 h-24 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-black" />
          </div>
          <h1 className="text-4xl font-display font-bold text-white mb-4">Order Confirmed!</h1>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Thank you for your order. We&apos;ll send you a confirmation email shortly.
          </p>
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full text-black font-semibold"
            >
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-12 xl:px-20 py-6">
        <Link to="/cart" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to Cart
        </Link>
      </div>

      <section className="px-4 sm:px-6 lg:px-12 xl:px-20 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {['Shipping', 'Payment', 'Review'].map((label, index) => (
              <div key={label} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step > index + 1 ? 'bg-green-400 text-black' :
                  step === index + 1 ? 'bg-white text-black' :
                  'bg-white/10 text-white/40'
                }`}>
                  {step > index + 1 ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <span className={`hidden sm:block text-sm ${
                  step >= index + 1 ? 'text-white' : 'text-white/40'
                }`}>
                  {label}
                </span>
                {index < 2 && <div className="w-8 h-px bg-white/20" />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 space-y-6">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/5 rounded-2xl p-6 border border-white/5"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <Truck className="w-5 h-5 text-green-400" />
                      <h2 className="text-xl font-display font-semibold text-white">Shipping Information</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input type="text" placeholder="First Name" required className="input-field" />
                      <input type="text" placeholder="Last Name" required className="input-field" />
                      <input type="email" placeholder="Email" required className="input-field sm:col-span-2" />
                      <input type="tel" placeholder="Phone" required className="input-field sm:col-span-2" />
                      <input type="text" placeholder="Address" required className="input-field sm:col-span-2" />
                      <input type="text" placeholder="City" required className="input-field" />
                      <input type="text" placeholder="Postal Code" required className="input-field" />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/5 rounded-2xl p-6 border border-white/5"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard className="w-5 h-5 text-green-400" />
                      <h2 className="text-xl font-display font-semibold text-white">Payment Method</h2>
                    </div>
                    <div className="space-y-4">
                      <label className="flex items-center gap-4 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                        <input type="radio" name="payment" defaultChecked className="w-4 h-4 accent-green-400" />
                        <span className="text-white">Cash on Delivery</span>
                      </label>
                      <label className="flex items-center gap-4 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                        <input type="radio" name="payment" className="w-4 h-4 accent-green-400" />
                        <span className="text-white">bKash</span>
                      </label>
                      <label className="flex items-center gap-4 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                        <input type="radio" name="payment" className="w-4 h-4 accent-green-400" />
                        <span className="text-white">Nagad</span>
                      </label>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/5 rounded-2xl p-6 border border-white/5"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <Lock className="w-5 h-5 text-green-400" />
                      <h2 className="text-xl font-display font-semibold text-white">Review Order</h2>
                    </div>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                          <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{item.product.name}</h4>
                            <p className="text-white/60 text-sm">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-white font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Summary */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                  <h3 className="text-lg font-display font-semibold text-white mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-white/60">
                      <span>Subtotal</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Shipping</span>
                      <span className="text-green-400">Free</span>
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between">
                      <span className="text-white font-semibold">Total</span>
                      <span className="text-xl font-bold gradient-text">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isProcessing}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 py-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full text-black font-semibold disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing...' : step === 3 ? 'Place Order' : 'Continue'}
                  </motion.button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}