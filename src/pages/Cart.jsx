import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiChevronRight, FiShoppingBag, FiTag } from 'react-icons/fi';
import { getCart, updateQuantity as updateCartQty, removeFromCart as removeCartItem } from '../utils/cart';

const Cart = () => {
  const [cartItems, setCartItems] = useState(() => getCart());
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponStatus, setCouponStatus] = useState({ type: '', message: '' });

  const updateQuantity = (id, change) => {
    const updated = updateCartQty(id, change);
    setCartItems(updated);
  };

  const removeItem = (id) => {
    const updated = removeCartItem(id);
    setCartItems(updated);
  };

  const applyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'SPHERE10') {
      setDiscountPercent(10);
      setCouponStatus({ type: 'success', message: '10% discount applied successfully!' });
    } else {
      setCouponStatus({ type: 'error', message: 'Invalid coupon code.' });
    }
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 25;
  const tax = subtotal * 0.08; // 8% sales tax estimate
  const total = subtotal - discountAmount + shipping + tax;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <div className="min-h-screen bg-primary pt-24 pb-32 px-4 sm:px-6 lg:px-8">
      {/* Background soft lighting */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-blush/3 blur-[135px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 font-body text-[10px] uppercase tracking-widest text-secondary/40 mb-8">
          <Link to="/" className="hover:text-accent transition-colors duration-300">Home</Link>
          <FiChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-accent transition-colors duration-300">Shop</Link>
          <FiChevronRight className="w-3 h-3" />
          <span className="text-accent">Shopping Bag</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary tracking-wide mb-12">
          Shopping Bag
        </h1>

        <AnimatePresence mode="wait">
          {cartItems.length > 0 ? (
            <motion.div
              key="cart-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              {/* Left Column: Cart Items list & Coupon */}
              <div className="lg:col-span-8 space-y-8">
                {/* Cart Items Card Container */}
                <div className="border border-border/20 rounded-xl bg-card/45 backdrop-blur-md overflow-hidden divide-y divide-border/10 shadow-soft">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      exit={{ opacity: 0, x: -100 }}
                      className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-stretch sm:items-center justify-between group relative"
                    >
                      {/* Product information */}
                      <div className="flex items-center gap-6">
                        {/* Image */}
                        <div className="w-20 sm:w-24 aspect-[3/4] rounded-lg overflow-hidden shrink-0 border border-border/20 bg-primary/40 relative">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>

                        {/* Title details */}
                        <div>
                          <span className="font-body text-[9px] uppercase tracking-[0.25em] text-accent mb-0.5 block">
                            {item.brand}
                          </span>
                          <h3 className="font-heading text-base sm:text-lg font-semibold text-secondary tracking-wide mb-1">
                            {item.title}
                          </h3>
                          <p className="font-body text-xs text-secondary/40 tracking-wide mb-3 line-clamp-1">
                            {item.subtitle}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <span className="font-body text-[10px] uppercase tracking-widest text-secondary/50 border border-border/10 px-2 py-1 rounded bg-primary/20">
                              Size: {item.size}
                            </span>
                            <span className="font-body text-[10px] uppercase tracking-widest text-secondary/50 border border-border/10 px-2 py-1 rounded bg-primary/20">
                              Color: {item.color}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Stepper, price, delete */}
                      <div className="flex items-center justify-between sm:justify-end gap-8 border-t sm:border-t-0 border-border/10 pt-4 sm:pt-0">
                        
                        {/* Quantity controls */}
                        <div className="flex items-center border border-border/30 h-10 w-28 rounded overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-9 h-full flex items-center justify-center text-secondary hover:text-accent hover:bg-card/30 transition-all duration-200"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus className="w-3 h-3" />
                          </button>
                          <span className="flex-1 text-center font-body text-xs font-semibold text-secondary">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-9 h-full flex items-center justify-center text-secondary hover:text-accent hover:bg-card/30 transition-all duration-200"
                            aria-label="Increase quantity"
                          >
                            <FiPlus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right sm:w-24">
                          <span className="font-heading text-lg font-semibold text-secondary block">
                            ${item.price * item.quantity}
                          </span>
                          {item.quantity > 1 && (
                            <span className="font-body text-[10px] text-secondary/35 tracking-wider block mt-0.5">
                              (${item.price} each)
                            </span>
                          )}
                        </div>

                        {/* Remove item */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-9 h-9 border border-border/30 text-secondary/60 hover:border-accent hover:text-accent flex items-center justify-center rounded transition-all duration-300"
                          aria-label="Remove item"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Coupon Code Section */}
                <motion.div variants={itemVariants} className="border border-border/20 rounded-xl bg-card/45 backdrop-blur-md p-6 sm:p-8 shadow-soft">
                  <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-secondary mb-4 flex items-center gap-2">
                    <FiTag className="text-accent" />
                    <span>Apply Promotion / Coupon</span>
                  </h4>
                  <form onSubmit={applyCoupon} className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Enter coupon code (e.g. SPHERE10)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full h-11 px-4 bg-primary/45 border border-border/80 text-secondary placeholder-secondary/30 text-xs font-body uppercase tracking-wider focus:outline-none focus:border-accent transition-colors duration-300"
                      />
                    </div>
                    <button
                      type="submit"
                      className="h-11 px-6 border border-accent text-accent font-body text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-primary transition-colors duration-300 shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                  {couponStatus.message && (
                    <p className={`font-body text-[11px] uppercase tracking-wider mt-3 ${
                      couponStatus.type === 'success' ? 'text-accent' : 'text-red-400'
                    }`}>
                      {couponStatus.message}
                    </p>
                  )}
                  <p className="font-body text-[10px] text-secondary/40 tracking-wider mt-2.5">
                    Tip: Use <span className="text-accent font-semibold">SPHERE10</span> for 10% discount on order summary items!
                  </p>
                </motion.div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-4">
                <motion.div
                  variants={itemVariants}
                  className="border border-border/20 rounded-xl bg-card/45 backdrop-blur-md p-6 sm:p-8 shadow-soft relative overflow-hidden"
                >
                  {/* Subtle inside borders */}
                  <span className="absolute top-4 left-4 w-4 h-4 border-t border-l border-accent/20 pointer-events-none" />
                  <span className="absolute top-4 right-4 w-4 h-4 border-t border-r border-accent/20 pointer-events-none" />

                  <h3 className="font-heading text-lg font-semibold uppercase tracking-wider text-secondary mb-6 pb-4 border-b border-border/10">
                    Order Summary
                  </h3>

                  <div className="space-y-4 font-body text-xs text-secondary/70 tracking-wider mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-secondary font-semibold">${subtotal}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-accent">
                        <span>Coupon Discount (10%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping Estimate</span>
                      <span className="text-secondary font-semibold">
                        {shipping === 0 ? 'Free' : `$${shipping}`}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Tax Estimate</span>
                      <span className="text-secondary font-semibold">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Divider line */}
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent my-6" />

                  {/* Total price */}
                  <div className="flex justify-between items-baseline mb-8">
                    <span className="font-heading text-sm font-semibold uppercase tracking-widest text-secondary">Order Total</span>
                    <span className="font-heading text-2xl font-bold text-accent">${total.toFixed(2)}</span>
                  </div>

                  {/* Checkout CTA */}
                  <Link to="/checkout" className="block mb-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full h-12 bg-accent text-primary font-body text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-accent/90 flex items-center justify-center gap-2"
                    >
                      <FiShoppingBag className="w-4 h-4" />
                      <span>Proceed to Checkout</span>
                    </motion.button>
                  </Link>

                  <Link
                    to="/shop"
                    className="block text-center font-body text-[10px] uppercase tracking-widest text-secondary/40 hover:text-accent transition-colors duration-300"
                  >
                    Continue Shopping
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-cart"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 border border-dashed border-border/30 rounded-xl max-w-2xl mx-auto"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-border/30 text-secondary/30 mb-6 bg-card/25 backdrop-blur-sm">
                <FiShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-secondary mb-3 tracking-wide">
                Your Shopping Bag is Empty
              </h3>
              <p className="font-body text-xs text-secondary/40 tracking-wider max-w-sm mx-auto mb-8 leading-relaxed">
                Discover timeless fashion crafted for modern elegance. Explore collections designed to elevate your everyday style.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-primary font-body text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-accent/90 shadow-lg"
              >
                Explore Shop
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Cart;
