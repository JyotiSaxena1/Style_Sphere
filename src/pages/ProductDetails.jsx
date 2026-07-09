import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiHeart, FiShoppingBag, FiChevronRight, FiTruck, FiRefreshCw,
  FiShield, FiMinus, FiPlus, FiStar, FiCheck,
} from 'react-icons/fi';
import { addToCart } from '../utils/cart';
import { isWishlisted, addToWishlist, removeFromWishlist } from '../utils/wishlist';

// ─── Static Product Data ─────────────────────────────────────────────────────

const product = {
  id: 1,
  title: 'Aurelia Trench Coat',
  category: 'Women — Outwear',
  brand: 'Prada',
  rating: 4.8,
  reviewCount: 124,
  price: 380,
  originalPrice: 450,
  discount: '16% OFF',
  description:
    'An elevated take on the timeless trench coat, the Aurelia is tailored from a supple cashmere-wool blend that drapes effortlessly. Double-breasted with tortoiseshell buttons and a belted waist, it epitomises understated luxury for the modern wardrobe. Fully lined in silk-satin for a smooth, premium finish.',
  colors: ['Beige', 'Black', 'Navy', 'Blush'],
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  images: [
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
  ],
  specs: [
    { label: 'Material', value: '70% Cashmere · 30% Wool' },
    { label: 'Lining', value: '100% Silk-Satin' },
    { label: 'Closure', value: 'Double-Breasted Buttons' },
    { label: 'Fit', value: 'Regular / Tailored' },
    { label: 'Care', value: 'Dry Clean Only' },
    { label: 'Origin', value: 'Made in Italy' },
  ],
  reviews: [
    {
      id: 1,
      name: 'Charlotte Laurent',
      location: 'Paris, France',
      rating: 5,
      date: 'March 2026',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
      text: 'Absolutely breathtaking craftsmanship. The cashmere blend is incredibly soft and the tailoring is impeccable. Worth every penny.',
    },
    {
      id: 2,
      name: 'Seraphina Chen',
      location: 'New York, USA',
      rating: 5,
      date: 'February 2026',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop',
      text: 'My go-to coat for every occasion. The silk lining feels luxurious and the fit is perfection. I receive compliments constantly.',
    },
    {
      id: 3,
      name: 'Isabelle Moreau',
      location: 'London, UK',
      rating: 4,
      date: 'January 2026',
      avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=100&auto=format&fit=crop',
      text: 'Exquisite quality. The Beige colourway is more beautiful in person. Sizing runs slightly long but otherwise perfect.',
    },
  ],
  shipping: [
    { title: 'Standard Delivery', detail: '3–5 business days · Free over $200' },
    { title: 'Express Delivery', detail: '1–2 business days · $25' },
    { title: 'Same Day (NYC)', detail: 'Order before 12pm · $45' },
    { title: 'Free Returns', detail: '30-day no-questions-asked return policy' },
  ],
};

const relatedProducts = [
  {
    id: 2,
    title: 'Monarque Wool Blazer',
    category: 'Women',
    price: 450,
    originalPrice: 580,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Luna Cashmere Knit',
    category: 'Women',
    price: 240,
    originalPrice: 310,
    image: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Athena Velvet Gown',
    category: 'Women',
    price: 790,
    originalPrice: 950,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Sienna Leather Tote',
    category: 'Accessories',
    price: 520,
    originalPrice: 680,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── StarRating helper ────────────────────────────────────────────────────────

const StarRating = ({ rating, size = 'sm' }) => {
  const cls = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          className={`${cls} transition-colors duration-200 ${star <= Math.round(rating) ? 'fill-accent text-accent' : 'text-border/60'
            }`}
        />
      ))}
    </div>
  );
};

// ─── ProductDetails Page ──────────────────────────────────────────────────────

const ProductDetails = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    setWishlisted(isWishlisted(product.id));
  }, []);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleWishlistToggle = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
      setWishlisted(false);
    } else {
      addToWishlist(product);
      setWishlisted(true);
    }
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'reviews', label: `Reviews (${product.reviewCount})` },
    { id: 'shipping', label: 'Shipping' },
  ];

  return (
    <div className="min-h-screen bg-primary pt-20">

      {/* ── Breadcrumbs ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center gap-2 font-body text-[10px] uppercase tracking-widest text-secondary/40">
          <Link to="/" className="hover:text-accent transition-colors duration-300">Home</Link>
          <FiChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-accent transition-colors duration-300">Shop</Link>
          <FiChevronRight className="w-3 h-3" />
          <span className="text-accent">{product.title}</span>
        </div>
      </div>

      {/* ── Main Product Section ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* ── Left: Gallery ─────────────────────────────────────────────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4"
          >
            {/* Main Image */}
            <motion.div variants={fadeUp} className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border/20 bg-card/30 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={product.images[activeImage]}
                  alt={product.title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
              </AnimatePresence>

              {/* Discount Badge */}
              <span className="absolute top-4 left-4 z-10 bg-accent text-primary font-body text-[9px] font-bold uppercase tracking-widest px-3 py-1.5">
                {product.discount}
              </span>

              {/* Corner frames */}
              <span className="absolute top-0 left-0 w-8 h-8 border-t border-l border-accent/30 z-10 pointer-events-none" />
              <span className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-accent/30 z-10 pointer-events-none" />
            </motion.div>

            {/* Thumbnail Strip */}
            <motion.div variants={fadeUp} className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${activeImage === i ? 'border-accent shadow-soft' : 'border-border/20 hover:border-accent/40'
                    }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover object-center" loading="lazy" />
                  {activeImage === i && (
                    <div className="absolute inset-0 bg-accent/10" />
                  )}
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Product Info ────────────────────────────────────────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8"
          >
            {/* Brand + Category */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="font-body text-[10px] uppercase tracking-[0.3em] text-accent border border-accent/30 bg-accent/8 px-3 py-1.5">
                {product.brand}
              </span>
              <span className="text-border/50 text-xs">·</span>
              <span className="font-body text-[10px] uppercase tracking-[0.2em] text-secondary/50">
                {product.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 variants={fadeUp} className="font-heading text-3xl sm:text-4xl xl:text-5xl font-bold text-secondary tracking-wide leading-tight">
              {product.title}
            </motion.h1>

            {/* Rating */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <StarRating rating={product.rating} />
              <span className="font-body text-xs text-accent font-semibold">{product.rating}</span>
              <span className="font-body text-xs text-secondary/40 tracking-wider">
                ({product.reviewCount} reviews)
              </span>
            </motion.div>

            {/* Price */}
            <motion.div variants={fadeUp} className="flex items-baseline gap-4 pb-6 border-b border-border/10">
              <span className="font-heading text-3xl font-bold text-accent">${product.price}</span>
              <span className="font-body text-base text-secondary/35 line-through decoration-secondary/25">${product.originalPrice}</span>
              <span className="font-body text-[10px] uppercase tracking-widest text-accent/70 border border-accent/20 px-2 py-1">
                Save ${product.originalPrice - product.price}
              </span>
            </motion.div>

            {/* Colors */}
            <motion.div variants={fadeUp} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-body text-xs uppercase tracking-[0.2em] text-secondary/60">Color</h4>
                <span className="font-body text-xs text-accent tracking-wider">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border font-body text-[10px] uppercase tracking-widest transition-all duration-300 ${selectedColor === color
                      ? 'border-accent bg-accent/10 text-accent font-semibold'
                      : 'border-border/40 text-secondary/55 hover:border-accent/40'
                      }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Sizes */}
            <motion.div variants={fadeUp} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-body text-xs uppercase tracking-[0.2em] text-secondary/60">Size</h4>
                {!selectedSize && (
                  <span className="font-body text-[10px] text-secondary/40 tracking-wider italic">Please select a size</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border font-body text-xs uppercase tracking-widest transition-all duration-300 ${selectedSize === size
                      ? 'border-accent bg-accent text-primary font-bold'
                      : 'border-border/40 text-secondary/65 hover:border-accent/40'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Quantity + CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 items-stretch">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-border/30 h-12 w-full sm:w-36 shrink-0">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-full flex items-center justify-center text-secondary hover:text-accent hover:bg-card/30 transition-all duration-200"
                >
                  <FiMinus className="w-3.5 h-3.5" />
                </button>
                <span className="flex-1 text-center font-body text-sm font-semibold text-secondary">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-full flex items-center justify-center text-secondary hover:text-accent hover:bg-card/30 transition-all duration-200"
                >
                  <FiPlus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart */}
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                disabled={!selectedSize}
                className={`flex-1 h-12 inline-flex items-center justify-center gap-2 font-body text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${addedToCart
                  ? 'bg-secondary text-primary'
                  : selectedSize
                    ? 'bg-accent text-primary hover:bg-accent/90'
                    : 'bg-accent/30 text-primary/50 cursor-not-allowed'
                  }`}
              >
                {addedToCart ? (
                  <>
                    <FiCheck className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <FiShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </motion.button>

              {/* Wishlist */}
              <motion.button
                onClick={handleWishlistToggle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 border flex items-center justify-center shrink-0 transition-all duration-300 ${wishlisted ? 'border-accent bg-accent/10 text-accent' : 'border-border/30 text-secondary/70 hover:border-accent hover:text-accent'
                  }`}
                aria-label="Add to wishlist"
              >
                <FiHeart className={`w-5 h-5 transition-all duration-300 ${wishlisted ? 'fill-accent' : ''}`} />
              </motion.button>
            </motion.div>

            {/* Shipping Trust Badges */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 pt-2 border-t border-border/10">
              {[
                { icon: <FiTruck className="w-4 h-4" />, label: 'Free Shipping', sub: 'Over $200' },
                { icon: <FiRefreshCw className="w-4 h-4" />, label: 'Free Returns', sub: '30 Days' },
                { icon: <FiShield className="w-4 h-4" />, label: 'Authentic', sub: 'Guaranteed' },
              ].map((badge) => (
                <div key={badge.label} className="flex flex-col items-center gap-1.5 text-center">
                  <span className="text-accent">{badge.icon}</span>
                  <span className="font-body text-[10px] text-secondary/80 uppercase tracking-widest">{badge.label}</span>
                  <span className="font-body text-[9px] text-secondary/40 tracking-wider">{badge.sub}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Tabs Section ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border/10">
        {/* Tab Headers */}
        <div className="flex gap-0 border-b border-border/20 mb-10 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative shrink-0 px-6 py-4 font-body text-xs uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === tab.id
                ? 'text-accent'
                : 'text-secondary/50 hover:text-secondary/80'
                }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'description' && (
            <motion.div
              key="description"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              {/* Description Text */}
              <div>
                <h3 className="font-heading text-xl font-semibold text-secondary tracking-wide mb-4">
                  About This Piece
                </h3>
                <p className="font-body text-sm text-secondary/65 leading-relaxed tracking-wide mb-6">
                  {product.description}
                </p>
                <p className="font-body text-sm text-secondary/55 leading-relaxed tracking-wide">
                  Each Aurelia is individually inspected by our master tailors in Milan before shipment, ensuring an impeccable standard of quality with every order. The coat arrives in our signature luxury garment bag, making it an ideal gift for the discerning fashion lover.
                </p>
              </div>

              {/* Specifications Table */}
              <div>
                <h3 className="font-heading text-xl font-semibold text-secondary tracking-wide mb-4">
                  Specifications
                </h3>
                <div className="divide-y divide-border/10">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex items-center justify-between py-3.5">
                      <span className="font-body text-[10px] uppercase tracking-widest text-secondary/45">{spec.label}</span>
                      <span className="font-body text-xs text-secondary/80 tracking-wide">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Overall Rating Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 border border-border/20 rounded-xl bg-card/25 backdrop-blur-sm mb-8">
                <div className="text-center">
                  <p className="font-heading text-5xl font-bold text-accent">{product.rating}</p>
                  <StarRating rating={product.rating} size="md" />
                  <p className="font-body text-[10px] text-secondary/40 tracking-wider mt-1">{product.reviewCount} verified reviews</p>
                </div>
                <div className="w-full sm:flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const pct = star === 5 ? 78 : star === 4 ? 16 : star === 3 ? 4 : star === 2 ? 1 : 1;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="font-body text-[10px] text-secondary/50 w-4 text-right">{star}</span>
                        <FiStar className="w-3 h-3 fill-accent text-accent shrink-0" />
                        <div className="flex-1 h-1.5 bg-border/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-accent/70 to-accent rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="font-body text-[10px] text-secondary/35 w-8">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="p-6 rounded-xl border border-border/20 bg-card/25 backdrop-blur-sm relative overflow-hidden group hover:border-accent/30 transition-colors duration-300">
                    <StarRating rating={review.rating} />
                    <p className="font-body text-sm text-secondary/70 leading-relaxed tracking-wide my-4 italic">
                      "{review.text}"
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border/10">
                      <img src={review.avatar} alt={review.name} className="w-9 h-9 rounded-full object-cover border border-accent/20" loading="lazy" />
                      <div>
                        <p className="font-heading text-sm font-semibold text-secondary">{review.name}</p>
                        <p className="font-body text-[9px] text-secondary/35 uppercase tracking-widest mt-0.5">{review.location} · {review.date}</p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'shipping' && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {product.shipping.map((item, i) => (
                <div key={i} className="flex gap-4 p-6 border border-border/20 rounded-xl bg-card/25 backdrop-blur-sm group hover:border-accent/30 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-full border border-accent/30 bg-accent/8 text-accent flex items-center justify-center shrink-0">
                    {i === 0 ? <FiTruck className="w-4 h-4" /> : i === 3 ? <FiRefreshCw className="w-4 h-4" /> : <FiShield className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-heading text-sm font-semibold text-secondary tracking-wide mb-1">{item.title}</h4>
                    <p className="font-body text-xs text-secondary/55 tracking-wide leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Related Products ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border/10">
        <div className="text-center max-w-xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="block font-body text-[10px] uppercase tracking-[0.3em] text-accent mb-3"
          >
            You May Also Like
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-2xl sm:text-3xl font-bold text-secondary tracking-wide mb-3"
          >
            Related Products
          </motion.h2>
          <div className="w-12 h-[1px] bg-accent/50 mx-auto" />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {relatedProducts.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col rounded-xl overflow-hidden border border-border/20 bg-card/45 backdrop-blur-md transition-all duration-300 hover:border-accent/40 shadow-soft cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="absolute top-4 left-4 font-body text-[8px] uppercase tracking-widest text-secondary bg-primary/80 backdrop-blur-sm border border-border/30 px-2.5 py-1">
                  {item.category}
                </span>
              </div>
              <div className="p-4 flex items-center justify-between border-t border-border/10">
                <div>
                  <h3 className="font-heading text-sm font-semibold text-secondary group-hover:text-accent transition-colors duration-300 mb-1">{item.title}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="font-body text-sm font-semibold text-accent">${item.price}</span>
                    <span className="font-body text-[10px] text-secondary/35 line-through">${item.originalPrice}</span>
                  </div>
                </div>
              </div>
              <div className="h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default ProductDetails;
