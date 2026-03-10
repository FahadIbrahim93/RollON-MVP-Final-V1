import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShoppingCart,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/shop/CartDrawer';
import { Footer } from '@/sections/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/cartStore';
import { FadeIn } from '@/components/animations/FadeIn';

export function Cart() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCartStore();
  const total = totalPrice();
  const shipping = total > 3000 ? 0 : 150;
  const grandTotal = total + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-3xl sm:text-4xl font-bold font-['Poppins'] text-foreground mb-8">
              Shopping Cart
            </h1>
          </FadeIn>

          {items.length === 0 ? (
            <FadeIn delay={0.1}>
              <div className="text-center py-16 bg-card rounded-2xl border border-border/50">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center mb-6"
                >
                  <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                </motion.div>
                <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">
                  Looks like you haven&apos;t added anything yet.
                </p>
                <Button asChild>
                  <Link to="/shop">Start Shopping</Link>
                </Button>
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <FadeIn delay={0.1} className="lg:col-span-2">
                <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">
                        {items.length} {items.length === 1 ? 'Item' : 'Items'}
                      </h2>
                      <Button variant="ghost" size="sm" onClick={clearCart}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear Cart
                      </Button>
                    </div>
                  </div>

                  <div className="divide-y divide-border">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.productId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 flex gap-6"
                      >
                        {/* Image */}
                        <Link
                          to={`/product/${item.productId}`}
                          className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/product/${item.productId}`}
                            className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          <p className="text-primary font-semibold mt-1">
                            ৳{item.price.toLocaleString()}
                          </p>

                          <div className="flex items-center justify-between mt-4">
                            {/* Quantity */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.productId, item.quantity - 1)
                                }
                                className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-10 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.productId, item.quantity + 1)
                                }
                                className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            {/* Remove */}
                            <button
                              onClick={() => removeItem(item.productId)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="text-right hidden sm:block">
                          <p className="font-semibold">
                            ৳{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Order Summary */}
              <FadeIn delay={0.2}>
                <div className="bg-card rounded-2xl border border-border/50 p-6 sticky top-24">
                  <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>৳{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={shipping === 0 ? 'text-green-500' : ''}>
                        {shipping === 0 ? 'Free' : `৳${shipping}`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders over ৳3,000
                      </p>
                    )}
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-primary">
                        ৳{grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                    asChild
                  >
                    <Link to="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>

                  <Button variant="outline" className="w-full mt-3" asChild>
                    <Link to="/shop">Continue Shopping</Link>
                  </Button>

                  {/* Payment Methods */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground text-center mb-3">
                      We accept
                    </p>
                    <div className="flex justify-center gap-2 flex-wrap">
                      {['bKash', 'Nagad', 'Rocket', 'Visa', 'Mastercard'].map(
                        (method) => (
                          <span
                            key={method}
                            className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground"
                          >
                            {method}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
