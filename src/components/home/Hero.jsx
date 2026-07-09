import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/hero.png';

const MotionLink = motion(Link);

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  },
});

const slideInRight = {
  hidden: { opacity: 0, x: 80, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// ─── Hero Component ───────────────────────────────────────────────────────────

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-primary flex items-center">

      {/* ── Gradient Overlay ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/60 to-transparent" />
      </div>

      {/* ── Decorative Blurred Orbs ──────────────────────────────────────── */}
      <motion.div
        className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-25 blur-3xl pointer-events-none z-0"
        style={{ background: '#F9DCE5' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-60px] left-[20%] w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none z-0"
        style={{ background: '#DCEEFF' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute top-[30%] right-[5%] w-48 h-48 rounded-full opacity-15 blur-3xl pointer-events-none z-0"
        style={{ background: '#F9DCE5' }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
      <motion.div
        className="absolute top-[10%] right-[30%] w-32 h-32 rounded-full opacity-10 blur-2xl pointer-events-none z-0"
        style={{ background: '#DCEEFF' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* ── Main Grid Layout ─────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28 lg:py-0 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 min-h-screen items-center">

        {/* ── LEFT COLUMN ─────────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeUp(0)}>
            <span className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 text-accent font-body text-[10px] uppercase tracking-[0.3em] px-4 py-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              New Luxury Collection
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div variants={fadeUp(0.1)} className="space-y-2">
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.08] text-secondary">
              Luxury
            </h1>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.08]">
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #C9A227 0%, #e8c66a 50%, #C9A227 100%)',
                }}
              >
                Redefined
              </span>
            </h1>
          </motion.div>

          {/* Decorative divider */}
          <motion.div variants={fadeUp(0.2)} className="flex items-center gap-4 w-full justify-center lg:justify-start">
            <span className="block w-12 h-[1px] bg-accent/60" />
            <span className="block w-2 h-2 rotate-45 border border-accent/60" />
            <span className="block w-6 h-[1px] bg-accent/30" />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp(0.3)}
            className="font-body text-secondary/65 text-sm sm:text-base leading-relaxed max-w-sm lg:max-w-md tracking-wide"
          >
            Discover timeless fashion crafted for modern elegance. Explore premium collections designed to elevate your everyday style.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp(0.4)}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start"
          >
            {/* Primary CTA */}
            <MotionLink
              to="/shop"
              className="relative inline-flex items-center justify-center gap-2 bg-accent text-primary font-body text-xs uppercase tracking-[0.2em] px-8 py-4 overflow-hidden group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative z-10 font-semibold">Shop Now</span>
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </MotionLink>

            {/* Secondary CTA */}
            <MotionLink
              to="/shop"
              className="inline-flex items-center justify-center gap-2 border border-secondary/30 text-secondary font-body text-xs uppercase tracking-[0.2em] px-8 py-4 hover:border-accent hover:text-accent transition-all duration-300 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <span>Explore Collection</span>
              <svg
                className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MotionLink>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={fadeUp(0.5)}
            className="flex items-center gap-8 pt-4 border-t border-secondary/10 w-full justify-center lg:justify-start"
          >
            {[
              { value: '500+', label: 'Luxury Pieces' },
              { value: '12K+', label: 'Happy Clients' },
              { value: '30+', label: 'Premium Brands' },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="font-heading text-xl font-bold text-accent">{stat.value}</p>
                <p className="font-body text-[10px] uppercase tracking-widest text-secondary/50 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — Hero Image ────────────────────────────────────── */}
        <motion.div
          className="relative flex items-center justify-center lg:justify-end"
          variants={slideInRight}
          initial="hidden"
          animate="visible"
        >
          {/* Glow behind image */}
          <div
            className="absolute inset-0 m-auto w-[70%] h-[70%] rounded-full blur-[80px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(201,162,39,0.12) 0%, transparent 70%)' }}
          />

          {/* Frame wrapper */}
          <div className="relative w-full max-w-[480px] lg:max-w-full">
            {/* Corner decorations */}
            <span className="absolute top-0 left-0 w-8 h-8 border-t border-l border-accent/40 z-20" />
            <span className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent/40 z-20" />
            <span className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-accent/40 z-20" />
            <span className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-accent/40 z-20" />

            {/* Floating accent pill */}
            <motion.div
              className="absolute -top-5 -right-5 z-30 bg-primary border border-accent/30 px-4 py-2 flex items-center gap-2"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-body text-[10px] uppercase tracking-widest text-accent">New Arrivals</span>
            </motion.div>

            {/* Floating season tag */}
            <motion.div
              className="absolute -bottom-5 -left-5 z-30 bg-accent px-4 py-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <span className="font-heading text-primary text-xs font-bold tracking-widest">SS 2026</span>
            </motion.div>

            {/* Hero Image */}
            <div className="overflow-hidden w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4]">
              <motion.img
                src={heroImage}
                alt="Luxury Fashion Hero — Style Sphere Collection"
                className="w-full h-full object-cover object-center"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll Down Indicator ────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="font-body text-[9px] uppercase tracking-[0.35em] text-secondary/40 group-hover:text-accent transition-colors duration-300">
          Scroll
        </span>
        <div className="relative w-6 h-10 border border-secondary/25 rounded-full flex items-start justify-center pt-2 group-hover:border-accent/50 transition-colors duration-300">
          <motion.div
            className="w-1 h-1 rounded-full bg-accent"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          <FiArrowDown className="w-3.5 h-3.5 text-secondary/30 group-hover:text-accent transition-colors duration-300" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
