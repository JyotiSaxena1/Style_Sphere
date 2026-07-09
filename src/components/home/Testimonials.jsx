import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Charlotte Laurent',
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    rating: 5,
    text: '“The craftsmanship of the Aurelia Trench Coat is absolutely breathtaking. The cashmere blend feels incredibly soft, and the tailoring is impeccable. Style Sphere has redefined my expectation of online luxury shopping.”',
  },
  {
    id: 2,
    name: 'Alexander Vance',
    location: 'London, UK',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    rating: 5,
    text: '“Exceptional customer service matched only by the premium quality of their collections. The Swiss timepiece I ordered arrived in stunning packaging and exceeded all expectations. A truly bespoke experience.”',
  },
  {
    id: 3,
    name: 'Seraphina Chen',
    location: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop',
    rating: 5,
    text: '“I am thoroughly impressed by the curations on Style Sphere. The Sienna Leather Tote is the perfect fusion of utility and couture. It is my daily staple, receiving endless compliments wherever I go.”',
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const Testimonials = () => {
  return (
    <section className="relative w-full bg-primary py-24 sm:py-32 overflow-hidden px-4 sm:px-6 lg:px-8 border-t border-border/10">
      {/* Decorative premium ambient lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-sky/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blush/5 blur-[130px] pointer-events-none z-0" />

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
            Client Reviews
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-secondary tracking-wide mb-4"
          >
            What Our Clients Say
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
            Trusted by thousands of fashion lovers worldwide.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col justify-between p-8 rounded-xl border border-border/20 bg-card/40 backdrop-blur-md transition-all duration-300 hover:border-accent/40 shadow-soft"
            >
              {/* Quote Graphic Overlay */}
              <div className="absolute top-6 right-8 text-secondary/5 group-hover:text-accent/10 transition-colors duration-300 pointer-events-none">
                <FaQuoteLeft className="w-12 h-12" />
              </div>

              <div>
                {/* 5 Gold Stars Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <FaStar key={i} className="text-accent w-4 h-4" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-body text-sm text-secondary/75 leading-relaxed tracking-wide mb-8 italic">
                  {t.text}
                </p>
              </div>

              {/* Customer Info Card Footer */}
              <div className="flex items-center gap-4 pt-6 border-t border-border/10">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-accent/30 bg-primary/50 relative">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-heading text-base font-semibold text-secondary tracking-wide group-hover:text-accent transition-colors duration-300">
                    {t.name}
                  </h4>
                  <p className="font-body text-[11px] text-secondary/40 uppercase tracking-widest mt-0.5">
                    {t.location}
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Accent Gold Light Line */}
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
