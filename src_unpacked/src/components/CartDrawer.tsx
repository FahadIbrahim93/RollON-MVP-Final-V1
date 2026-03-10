import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-green-400" />
                <h2 className="text-xl font-display font-semibold text-white">
                  Your Cart ({totalItems})
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4"
                  >
                    <ShoppingBag className="w-8 h-8 text-white/30" />
                  </motion.div>
                  <h3 className="text-lg font-display font-semibold text-white mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-white/50 mb-6">
                    Add some products to get started
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full text-black font-semibold"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5"
                    >
                      {/* Image */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-xl"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Crect fill="%231d1d1d" width="80" height="80" rx="12"/%3E%3Ctext fill="%234ade80" font-family="sans-serif" font-size="12" font-weight="bold" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EIMG%3C/text%3E%3C/svg%3E';
                        }}
                      />

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate mb-1">
                          {item.product.name}
                        </h4>
                        <p className="text-green-400 font-semibold mb-2">
                          {formatPrice(item.product.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-white/10 rounded-full">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                            >
                              <Minus className="w-3 h-3 text-white" />
                            </motion.button>
                            <span className="text-white text-sm w-6 text-center">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                            >
                              <Plus className="w-3 h-3 text-white" />
                            </motion.button>
                          </div>

                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 text-white/40 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white font-semibold">{formatPrice(totalPrice)}</span>
                </div>

                {/* Shipping */}
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Shipping</span>
                  <span className="text-green-400 text-sm">Free in Dhaka</span>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-white font-display font-semibold">Total</span>
                  <span className="text-2xl font-display font-bold gradient-text">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full text-black font-semibold flex items-center justify-center gap-2"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                  <button
                    onClick={clearCart}
                    className="w-full py-3 text-white/40 hover:text-white text-sm transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}