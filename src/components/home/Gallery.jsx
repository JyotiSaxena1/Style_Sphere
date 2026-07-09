import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';

const galleryImages = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
    link: 'https://instagram.com',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop',
    link: 'https://instagram.com',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop',
    link: 'https://instagram.com',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=600&auto=format&fit=crop',
    link: 'https://instagram.com',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=600&auto=format&fit=crop',
    link: 'https://instagram.com',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=600&auto=format&fit=crop',
    link: 'https://instagram.com',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const Gallery = () => {
  return (
    <section className="relative w-full bg-primary py-24 sm:py-32 overflow-hidden px-4 sm:px-6 lg:px-8 border-t border-border/10">
      {/* Background soft lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-accent/5 blur-[120px] pointer-events-none z-0" />

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
            Social Gallery
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-secondary tracking-wide mb-4"
          >
            Follow Our Journey
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
            Discover our latest collections, behind the scenes and luxury moments.
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-150px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-16"
        >
          {galleryImages.map((item) => (
            <motion.a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id}
              variants={itemVariants}
              className="group relative block aspect-square rounded-xl overflow-hidden shadow-soft border border-border/20 cursor-pointer bg-card/45"
            >
              {/* Image */}
              <img
                src={item.image}
                alt="Style Sphere Editorial Moment"
                className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-110"
                loading="lazy"
              />

              {/* Dark gradient overlay + glass hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-500 flex items-center justify-center" />

              {/* Instagram Icon Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 z-10">
                <div className="w-12 h-12 rounded-full bg-secondary/15 backdrop-blur-md border border-secondary/30 text-secondary flex items-center justify-center hover:bg-accent hover:text-primary hover:border-accent transition-colors duration-300">
                  <FaInstagram className="w-5 h-5" />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Follow Button Footer */}
        <div className="text-center">
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary font-body text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-accent/90 shadow-lg"
          >
            <FaInstagram className="w-4 h-4" />
            <span>Follow @stylesphere</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
