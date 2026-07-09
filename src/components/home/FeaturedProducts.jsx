import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';

const products = [
  {
    id: 1,
    title: 'Aurelia Trench Coat',
    subtitle: 'Classic tailored cashmere wool blend',
    category: 'Outwear',
    price: 380,
    originalPrice: 450,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Sienna Leather Tote',
    subtitle: 'Italian full-grain calfskin bag',
    category: 'Accessories',
    price: 520,
    originalPrice: 680,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Starlight Sunglasses',
    subtitle: '18k gold-plated monogram aviators',
    category: 'Accessories',
    price: 180,
    originalPrice: 240,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Chronos Gold Watch',
    subtitle: 'Automatic movement Swiss timepiece',
    category: 'Accessories',
    price: 890,
    originalPrice: 1200,
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 5,
    title: "L'Élixir Intense",
    subtitle: 'Sensual amber & jasmine perfume extract',
    category: 'Beauty',
    price: 145,
    originalPrice: 185,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Symphony Silk Scarf',
    subtitle: 'Hand-rolled pure mulberry silk scarf',
    category: 'Accessories',
    price: 95,
    originalPrice: 130,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 7,
    title: 'Chelsea Suede Boots',
    subtitle: 'Handcrafted Italian suede ankle boots',
    category: 'Footwear',
    price: 290,
    originalPrice: 370,
    image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 8,
    title: 'Luna Cashmere Knit',
    subtitle: 'Ultra-soft Mongolian cashmere knitwear',
    category: 'Women',
    price: 240,
    originalPrice: 310,
    image: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=600&auto=format&fit=crop',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const FeaturedProducts = () => {
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="relative w-full bg-primary py-24 sm:py-32 overflow-hidden px-4 sm:px-6 lg:px-8 border-t border-border/10">
      {/* Decorative luxury gradient orbs */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-blush/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] rounded-full bg-accent/5 blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-[10px] sm:text-xs font-body tracking-[0.3em] text-accent uppercase font-medium block mb-3"
          >
            Exclusive Collection
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-secondary tracking-wide mb-4"
          >
            Featured Products
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-16 h-[1px] bg-accent/50 mx-auto mb-5 origin-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-secondary/60 text-xs sm:text-sm font-body tracking-wider leading-relaxed"
          >
            Handpicked luxury essentials curated for modern elegance.
          </motion.p>
        </div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {products.map((product) => {
            const isLiked = wishlist[product.id];
            return (
              <motion.div
                key={product.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col justify-between rounded-xl overflow-hidden shadow-soft border border-border/20 bg-card/45 backdrop-blur-md transition-all duration-300 hover:border-accent/40"
              >
                {/* Image & Badges Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-primary/40">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-108"
                    loading="lazy"
                  />

                  {/* Dark gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 z-10 font-body text-[9px] uppercase tracking-widest text-secondary bg-primary/80 backdrop-blur-sm border border-border/30 px-3 py-1.5 rounded-none">
                    {product.category}
                  </span>

                  {/* Wishlist Heart Icon */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-primary/70 backdrop-blur-sm border border-border/20 text-secondary hover:bg-secondary hover:text-primary transition-all duration-300"
                    aria-label="Add to wishlist"
                  >
                    <FiHeart
                      className={`w-4 h-4 transition-colors duration-300 ${
                        isLiked ? 'fill-accent text-accent' : 'text-secondary/80 group-hover/btn:text-accent'
                      }`}
                    />
                  </button>

                  {/* Interactive Quick Add to Cart button overlay */}
                  <div className="absolute inset-x-4 bottom-4 z-20 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <button className="w-full h-11 inline-flex items-center justify-center gap-2 bg-secondary text-primary font-body text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-accent hover:text-primary transition-colors duration-300 shadow-lg">
                      <FiShoppingBag className="w-3.5 h-3.5" />
                      <span>Add To Cart</span>
                    </button>
                  </div>
                </div>

                {/* Info Block */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="mb-4">
                    <h3 className="font-heading text-lg font-semibold text-secondary tracking-wide group-hover:text-accent transition-colors duration-300 mb-1">
                      {product.title}
                    </h3>
                    <p className="font-body text-xs text-secondary/45 tracking-wide line-clamp-1">
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="flex items-baseline justify-between border-t border-border/10 pt-4">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-body text-base font-semibold text-accent">
                        ${product.price}
                      </span>
                      <span className="font-body text-xs text-secondary/35 line-through decoration-secondary/30">
                        ${product.originalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Elegant subtle bottom gold bar active on card hover */}
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
