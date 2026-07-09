import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/product/ProductCard';
import { getWishlist, removeFromWishlist } from '../utils/wishlist';
import { addToCart } from '../utils/cart';

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [addingToCart, setAddingToCart] = useState({});
  const [loading, setLoading] = useState(true);

  // Sync state with localStorage on mount
  useEffect(() => {
    setItems(getWishlist());
    setLoading(false);
  }, []);

  const handleRemove = (id) => {
    const updated = removeFromWishlist(id);
    setItems(updated);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddingToCart((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="min-h-screen bg-primary pt-24 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative luxury gradient orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-blush/3 blur-[135px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 font-body text-[10px] uppercase tracking-widest text-secondary/40 mb-8">
          <Link to="/" className="hover:text-accent transition-colors duration-300">Home</Link>
          <FiChevronRight className="w-3 h-3" />
          <span className="text-accent">Wishlist</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] sm:text-xs font-body tracking-[0.3em] text-accent uppercase font-medium block mb-3"
          >
            Your Curated Collection
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-secondary tracking-wide mb-4"
          >
            My Wishlist
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-16 h-[1px] bg-accent/50 mx-auto mb-5 origin-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-secondary/60 text-xs sm:text-sm font-body tracking-wider leading-relaxed"
          >
            Save your favorite luxury pieces for later.
          </motion.p>
        </div>

        {/* Wishlist Content Grid */}
        <AnimatePresence mode="popLayout">
          {!loading && items.length > 0 ? (
            <motion.div
              key="wishlist-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            >
              {items.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isAddingToCart={addingToCart[product.id]}
                  onRemove={handleRemove}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </motion.div>
          ) : !loading && (
            /* Premium Empty State */
            <motion.div
              key="wishlist-empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-md mx-auto text-center py-16 px-4"
            >
              {/* Premium Luxury SVG Illustration */}
              <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
                {/* Decorative gold background circle */}
                <div className="absolute inset-0 rounded-full border border-accent/10 border-dashed animate-spin-slow" />
                <div className="absolute w-[80%] h-[80%] rounded-full border border-secondary/5" />
                
                {/* Custom Line Art SVG for luxury hanger & heart */}
                <svg className="w-24 h-24 text-accent/60 relative z-10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {/* Luxury Coat Hanger */}
                  <path d="M50 15 C52 15, 55 18, 55 22 C55 26, 50 28, 50 30" />
                  <path d="M15 50 L50 30 L85 50" />
                  <path d="M15 50 C15 50, 20 54, 30 52 C35 51, 40 45, 50 45 C60 45, 65 51, 70 52 C80 54, 85 50, 85 50" />
                  
                  {/* Draped Heart outline below the hanger representing saved pieces */}
                  <path d="M50 45 C40 35, 25 45, 50 75 C75 45, 60 35, 50 45 Z" strokeDasharray="3 3" strokeWidth="1.2" className="animate-pulse" />
                  
                  {/* Little sparkling stars */}
                  <path d="M22 28 L24 30 L22 32 L20 30 Z" fill="currentColor" stroke="none" />
                  <path d="M78 32 L79 33 L78 34 L77 33 Z" fill="currentColor" stroke="none" />
                  <path d="M80 65 L81.5 66.5 L80 68 L78.5 66.5 Z" fill="currentColor" stroke="none" className="animate-pulse" />
                </svg>
              </div>

              <h2 className="font-heading text-xl sm:text-2xl font-bold text-secondary tracking-wide mb-3">
                Your wishlist is waiting for timeless pieces.
              </h2>
              
              <p className="font-body text-xs sm:text-sm text-secondary/45 tracking-wide leading-relaxed mb-8 max-w-xs mx-auto">
                Curate your dream closet by saving exclusive, handcrafted luxury wardrobe essentials.
              </p>

              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 border border-accent text-accent hover:bg-accent hover:text-primary transition-all duration-300 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest font-body shadow-lg"
              >
                Continue Shopping
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


    </div>
  );
};

export default Wishlist;
