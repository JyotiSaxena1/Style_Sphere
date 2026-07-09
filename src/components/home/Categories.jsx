import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: 'Women',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    link: '/shop',
    count: '120+ Items',
  },
  {
    title: 'Men',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop',
    link: '/shop',
    count: '85+ Items',
  },
  {
    title: 'Beauty',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
    link: '/shop',
    count: '45+ Items',
  },
  {
    title: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
    link: '/shop',
    count: '60+ Items',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1], // Cubic-bezier for elegant deceleration
    },
  },
};

const Categories = () => {
  return (
    <section className="relative w-full bg-primary py-24 sm:py-32 overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-sky/5 blur-[100px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-xl mx-auto mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-[10px] sm:text-xs font-body tracking-[0.3em] text-accent uppercase font-medium block mb-3"
          >
            Curated Collections
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-secondary tracking-wide mb-4"
          >
            Shop by Category
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
            Discover curated collections crafted for timeless elegance.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-150px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative block aspect-[3/4] rounded-xl overflow-hidden shadow-soft border border-border/20 cursor-pointer bg-card"
            >
              <Link to={category.link} className="absolute inset-0 z-30" />
              {/* Card Image */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={category.image}
                  alt={`${category.title} collection`}
                  className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Luxury Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

              {/* Dynamic Accent Borders (Gold light effects on hover) */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

              {/* Content Box */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                {/* Stats badge / subtitle */}
                <span className="font-body text-[9px] uppercase tracking-[0.25em] text-accent/80 mb-1 translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  {category.count}
                </span>

                {/* Title */}
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-secondary tracking-wider mb-3">
                  {category.title}
                </h3>

                {/* Explore button with glassmorphism */}
                <div className="overflow-hidden h-9">
                  <div className="flex flex-col transform transition-transform duration-500 group-hover:-translate-y-9">
                    {/* State 1: Invisible space */}
                    <span className="h-9 block" />
                    
                    {/* State 2: Slid in Explore button */}
                    <div className="h-9 inline-flex items-center justify-between px-4 rounded bg-secondary/10 backdrop-blur-md border border-secondary/20 text-secondary text-[11px] font-body uppercase tracking-[0.2em] w-full hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300">
                      <span>Explore</span>
                      <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
