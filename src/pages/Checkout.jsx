import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiChevronRight, FiLock, FiCreditCard, FiCheck,
  FiChevronDown, FiMapPin, FiUser, FiPhone, FiMail,
} from 'react-icons/fi';

// ─── Mock order items ─────────────────────────────────────────────────────────

const orderItems = [
  {
    id: 1,
    title: 'Aurelia Trench Coat',
    brand: 'Prada',
    color: 'Beige',
    size: 'M',
    qty: 1,
    price: 380,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Sienna Leather Tote',
    brand: 'Gucci',
    color: 'Black',
    size: 'O/S',
    qty: 1,
    price: 520,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=200&auto=format&fit=crop',
  },
];

// ─── Animation helpers ────────────────────────────────────────────────────────

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.12 },
  }),
};

// ─── Reusable form input ─────────────────────────────────────────────────────

const FormField = ({ label, id, type = 'text', placeholder, icon: Icon, required = false }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="font-body text-[10px] uppercase tracking-[0.25em] text-secondary/60">
      {label}{required && <span className="text-accent ml-1">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-secondary/30 pointer-events-none" />
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full h-11 ${Icon ? 'pl-10' : 'pl-4'} pr-4 bg-primary/40 border border-border/40 text-secondary placeholder-secondary/25 text-xs font-body tracking-wider focus:outline-none focus:border-accent/60 transition-colors duration-300`}
      />
    </div>
  </div>
);

// ─── Section card wrapper ────────────────────────────────────────────────────

const SectionCard = ({ title, number, children, custom }) => (
  <motion.div
    variants={sectionVariants}
    initial="hidden"
    animate="visible"
    custom={custom}
    className="border border-border/20 rounded-xl bg-card/40 backdrop-blur-md p-7 sm:p-8 shadow-soft relative overflow-hidden"
  >
    {/* Corner decorations */}
    <span className="absolute top-4 left-4 w-5 h-5 border-t border-l border-accent/20 pointer-events-none" />
    <span className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-accent/20 pointer-events-none" />

    <div className="flex items-center gap-3 mb-7 pb-5 border-b border-border/10">
      <span className="w-7 h-7 rounded-full bg-accent/10 border border-accent/30 text-accent flex items-center justify-center font-body text-[11px] font-bold shrink-0">
        {number}
      </span>
      <h2 className="font-heading text-lg font-semibold tracking-wider text-secondary uppercase">
        {title}
      </h2>
    </div>

    {children}
  </motion.div>
);

// ─── Checkout Page ────────────────────────────────────────────────────────────

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);

  const subtotal = orderItems.reduce((a, i) => a + i.price * i.qty, 0);
  const shipping = 0; // free for this order
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + shipping + tax;

  const paymentMethods = [
    { id: 'card', label: 'Credit / Debit Card', icon: <FiCreditCard className="w-4 h-4" /> },
    { id: 'paypal', label: 'PayPal', icon: <span className="font-bold text-[11px] tracking-widest">PP</span> },
    { id: 'apple', label: 'Apple Pay', icon: <span className="font-bold text-[11px] tracking-widest">AP</span> },
  ];

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-primary pt-28 pb-32 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-lg w-full text-center border border-border/20 rounded-2xl bg-card/40 backdrop-blur-md p-12 shadow-soft relative overflow-hidden"
        >
          <span className="absolute top-5 left-5 w-6 h-6 border-t border-l border-accent/30 pointer-events-none" />
          <span className="absolute bottom-5 right-5 w-6 h-6 border-b border-r border-accent/30 pointer-events-none" />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-6"
          >
            <FiCheck className="w-7 h-7 text-primary" />
          </motion.div>

          <h2 className="font-heading text-3xl font-bold text-secondary tracking-wide mb-2">Order Confirmed</h2>
          <div className="w-12 h-[1px] bg-accent/50 mx-auto my-4" />
          <p className="font-body text-xs text-secondary/55 tracking-wider leading-relaxed max-w-sm mx-auto mb-3">
            Your order <span className="text-accent font-semibold">#SS-202609142</span> has been placed and is now being processed by our luxury concierge team.
          </p>
          <p className="font-body text-[11px] text-secondary/35 tracking-wider mb-8">
            A confirmation will be sent to your email address.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="px-7 py-3 border border-accent text-accent font-body text-[10px] uppercase tracking-widest hover:bg-accent hover:text-primary transition-all duration-300"
            >
              Back to Home
            </Link>
            <Link
              to="/shop"
              className="px-7 py-3 bg-accent text-primary font-body text-[10px] font-bold uppercase tracking-widest hover:bg-accent/90 transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary pt-24 pb-32 px-4 sm:px-6 lg:px-8">
      {/* Ambient light */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-accent/4 blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-blush/4 blur-[130px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 font-body text-[10px] uppercase tracking-widest text-secondary/40 mb-8">
          <Link to="/" className="hover:text-accent transition-colors duration-300">Home</Link>
          <FiChevronRight className="w-3 h-3" />
          <Link to="/cart" className="hover:text-accent transition-colors duration-300">Cart</Link>
          <FiChevronRight className="w-3 h-3" />
          <span className="text-accent">Checkout</span>
        </div>

        {/* Page heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary tracking-wide mb-12"
        >
          Secure Checkout
        </motion.h1>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">

            {/* ── LEFT COLUMN: Forms ─────────────────────────────────────── */}
            <div className="xl:col-span-7 flex flex-col gap-8">

              {/* 1. Billing Details */}
              <SectionCard title="Billing Details" number="1" custom={0}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField label="First Name" id="billing-fname" placeholder="Charlotte" icon={FiUser} required />
                  <FormField label="Last Name" id="billing-lname" placeholder="Laurent" icon={FiUser} required />
                  <FormField label="Email Address" id="billing-email" type="email" placeholder="charlotte@stylesphere.com" icon={FiMail} required />
                  <FormField label="Phone Number" id="billing-phone" type="tel" placeholder="+1 (800) 555-0199" icon={FiPhone} />
                  <div className="sm:col-span-2">
                    <FormField label="Company Name (Optional)" id="billing-company" placeholder="Style Sphere Inc." />
                  </div>
                </div>
              </SectionCard>

              {/* 2. Shipping Address */}
              <SectionCard title="Shipping Address" number="2" custom={1}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <FormField label="Street Address" id="ship-street" placeholder="72 Fifth Avenue" icon={FiMapPin} required />
                  </div>
                  <FormField label="Apartment / Suite" id="ship-apt" placeholder="Apt 14B" />
                  <FormField label="City" id="ship-city" placeholder="New York" required />
                  <div className="flex flex-col gap-2">
                    <label htmlFor="ship-country" className="font-body text-[10px] uppercase tracking-[0.25em] text-secondary/60">
                      Country<span className="text-accent ml-1">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="ship-country"
                        className="w-full h-11 pl-4 pr-10 bg-primary/40 border border-border/40 text-secondary/80 text-xs font-body tracking-wider focus:outline-none focus:border-accent/60 appearance-none transition-colors duration-300 cursor-pointer"
                      >
                        {['United States', 'United Kingdom', 'France', 'Germany', 'Italy', 'Canada', 'Australia'].map((c) => (
                          <option key={c} className="bg-primary text-secondary">{c}</option>
                        ))}
                      </select>
                      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/30 pointer-events-none" />
                    </div>
                  </div>
                  <FormField label="ZIP / Postal Code" id="ship-zip" placeholder="10011" required />

                  {/* Same as billing toggle */}
                  <div className="sm:col-span-2">
                    <label className="flex items-center gap-3 cursor-pointer group mt-2">
                      <div
                        onClick={() => setSameAsShipping((v) => !v)}
                        className={`w-10 h-5 rounded-full border flex items-center transition-all duration-300 relative ${
                          sameAsShipping ? 'bg-accent border-accent' : 'bg-transparent border-border/40'
                        }`}
                      >
                        <motion.div
                          animate={{ x: sameAsShipping ? 20 : 2 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          className={`absolute w-3.5 h-3.5 rounded-full transition-colors duration-300 ${sameAsShipping ? 'bg-primary' : 'bg-secondary/40'}`}
                        />
                      </div>
                      <span className="font-body text-xs text-secondary/65 tracking-wide group-hover:text-secondary transition-colors duration-300">
                        Billing address same as shipping address
                      </span>
                    </label>
                  </div>
                </div>
              </SectionCard>

              {/* 3. Payment Method */}
              <SectionCard title="Payment Method" number="3" custom={2}>
                {/* Method toggle buttons */}
                <div className="flex flex-wrap gap-3 mb-7">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-center gap-2.5 px-4 py-3 border font-body text-[10px] uppercase tracking-widest transition-all duration-300 ${
                        paymentMethod === method.id
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border/30 text-secondary/55 hover:border-accent/40'
                      }`}
                    >
                      <span className={`transition-colors duration-300 ${paymentMethod === method.id ? 'text-accent' : 'text-secondary/40'}`}>
                        {method.icon}
                      </span>
                      {method.label}
                    </button>
                  ))}
                </div>

                {/* Card method fields */}
                <AnimatePresence mode="wait">
                  {paymentMethod === 'card' && (
                    <motion.div
                      key="card-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-5 overflow-hidden"
                    >
                      {/* Visual card preview */}
                      <div
                        className="relative w-full max-w-xs h-40 rounded-xl cursor-pointer select-none"
                        style={{ perspective: '800px' }}
                        onClick={() => setCardFlipped((f) => !f)}
                      >
                        <motion.div
                          animate={{ rotateY: cardFlipped ? 180 : 0 }}
                          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                          style={{ transformStyle: 'preserve-3d' }}
                          className="relative w-full h-full"
                        >
                          {/* Card Front */}
                          <div
                            className="absolute inset-0 rounded-xl border border-accent/20 p-5 flex flex-col justify-between overflow-hidden"
                            style={{ backfaceVisibility: 'hidden', background: 'linear-gradient(135deg, #1B1B1B 0%, #2a2a2a 100%)' }}
                          >
                            <div className="flex justify-between items-start">
                              <span className="font-heading text-sm font-bold tracking-widest text-secondary/80">Style Sphere</span>
                              <div className="flex gap-1">
                                <div className="w-6 h-6 rounded-full bg-accent/60" />
                                <div className="w-6 h-6 rounded-full bg-accent/30 -ml-3" />
                              </div>
                            </div>
                            <div>
                              <p className="font-body text-sm tracking-[0.2em] text-secondary/60 mb-2">•••• •••• •••• 4242</p>
                              <div className="flex justify-between">
                                <span className="font-body text-[9px] uppercase tracking-widest text-secondary/40">Card Holder</span>
                                <span className="font-body text-[9px] uppercase tracking-widest text-secondary/40">Expires</span>
                              </div>
                              <div className="flex justify-between mt-0.5">
                                <span className="font-body text-[11px] text-secondary/70 tracking-wider">Charlotte Laurent</span>
                                <span className="font-body text-[11px] text-secondary/70 tracking-wider">12/28</span>
                              </div>
                            </div>
                            {/* Shimmer chip */}
                            <div className="absolute top-1/2 left-5 w-10 h-7 rounded border border-accent/20 bg-gradient-to-br from-accent/20 to-accent/5" />
                          </div>
                          {/* Card Back */}
                          <div
                            className="absolute inset-0 rounded-xl border border-accent/20 flex flex-col justify-center overflow-hidden"
                            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'linear-gradient(135deg, #1B1B1B 0%, #2a2a2a 100%)' }}
                          >
                            <div className="w-full h-10 bg-secondary/10 mb-4" />
                            <div className="px-5 flex items-center justify-end gap-3">
                              <div className="flex-1 h-6 bg-secondary/5 rounded" />
                              <div className="w-12 h-8 bg-secondary/20 rounded flex items-center justify-center">
                                <span className="font-body text-[10px] text-secondary/50">CVV</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                      <p className="font-body text-[9px] text-secondary/30 tracking-widest uppercase">Click card to flip</p>

                      {/* Card Inputs */}
                      <FormField label="Name on Card" id="card-name" placeholder="Charlotte Laurent" icon={FiUser} required />
                      <FormField label="Card Number" id="card-number" placeholder="4242 4242 4242 4242" icon={FiCreditCard} required />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField label="Expiry Date" id="card-expiry" placeholder="MM / YY" required />
                        <FormField label="CVV" id="card-cvv" placeholder="•••" type="password" required />
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <motion.div
                      key="paypal-fields"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="p-6 border border-border/20 rounded-lg bg-primary/30 text-center"
                    >
                      <p className="font-body text-xs text-secondary/60 tracking-wide leading-relaxed">
                        You will be redirected to PayPal to complete your payment securely after clicking Place Order.
                      </p>
                    </motion.div>
                  )}

                  {paymentMethod === 'apple' && (
                    <motion.div
                      key="apple-fields"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="p-6 border border-border/20 rounded-lg bg-primary/30 text-center"
                    >
                      <p className="font-body text-xs text-secondary/60 tracking-wide leading-relaxed">
                        Apple Pay is available on supported Safari browsers and Apple devices. Complete payment via Face ID or Touch ID.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Security badge */}
                <div className="flex items-center gap-2 mt-6 pt-5 border-t border-border/10">
                  <FiLock className="w-3.5 h-3.5 text-accent shrink-0" />
                  <p className="font-body text-[10px] text-secondary/40 tracking-wider">
                    Your payment information is encrypted using 256-bit SSL security.
                  </p>
                </div>
              </SectionCard>
            </div>

            {/* ── RIGHT COLUMN: Order Summary ───────────────────────────── */}
            <div className="xl:col-span-5">
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                custom={3}
                className="border border-border/20 rounded-xl bg-card/40 backdrop-blur-md p-7 sm:p-8 shadow-soft relative overflow-hidden sticky top-28"
              >
                <span className="absolute top-4 left-4 w-5 h-5 border-t border-l border-accent/20 pointer-events-none" />
                <span className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-accent/20 pointer-events-none" />

                <h2 className="font-heading text-lg font-semibold tracking-wider text-secondary uppercase mb-6 pb-5 border-b border-border/10">
                  Order Summary
                </h2>

                {/* Items list */}
                <div className="space-y-5 mb-6">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-14 aspect-[3/4] rounded-lg overflow-hidden border border-border/20 bg-primary/40 shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover object-center" loading="lazy" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-heading text-sm font-semibold text-secondary tracking-wide truncate">{item.title}</p>
                        <p className="font-body text-[10px] text-secondary/40 tracking-wider mt-0.5">{item.brand} · {item.color} · {item.size}</p>
                        <p className="font-body text-[10px] text-secondary/35 tracking-wider mt-0.5">Qty: {item.qty}</p>
                      </div>
                      <span className="font-heading text-sm font-bold text-secondary shrink-0">${item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Totals breakdown */}
                <div className="space-y-3 font-body text-xs text-secondary/60 tracking-wider pb-5 border-b border-border/10 mb-5">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-secondary">${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-accent">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax (8%)</span>
                    <span className="text-secondary">${tax}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-baseline mb-8">
                  <span className="font-heading text-sm font-semibold uppercase tracking-widest text-secondary">Order Total</span>
                  <span className="font-heading text-2xl font-bold text-accent">${total.toFixed(2)}</span>
                </div>

                {/* Place order button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full h-13 py-4 bg-accent text-primary font-body text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-accent/90 flex items-center justify-center gap-2.5 shadow-lg"
                >
                  <FiLock className="w-3.5 h-3.5" />
                  <span>Place Order · ${total.toFixed(2)}</span>
                </motion.button>

                <p className="text-center font-body text-[9px] uppercase tracking-widest text-secondary/30 mt-4">
                  By placing your order you agree to our terms & privacy policy.
                </p>

                {/* Trust badges row */}
                <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-border/10 text-center">
                  {[
                    { label: 'SSL Secured', sub: '256-bit' },
                    { label: 'Free Returns', sub: '30 Days' },
                    { label: 'Authentic', sub: 'Guaranteed' },
                  ].map((b) => (
                    <div key={b.label}>
                      <FiLock className="w-4 h-4 text-accent mx-auto mb-1.5" />
                      <p className="font-body text-[9px] uppercase tracking-widest text-secondary/60">{b.label}</p>
                      <p className="font-body text-[8px] text-secondary/30 tracking-wider mt-0.5">{b.sub}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
