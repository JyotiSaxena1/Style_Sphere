import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const orbVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* ── Luxury Ambient Glows ────────────────────────────────────────── */}
      <motion.div
        variants={orbVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-accent/5 blur-[100px] sm:blur-[130px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] rounded-full bg-accent/3 blur-[80px] sm:blur-[100px]" />
      </motion.div>

      {/* Decorative Rotating Grid Circle */}
      <div className="absolute w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] border border-accent/5 rounded-full pointer-events-none animate-spin-slow" />
      <div className="absolute w-[200px] sm:w-[320px] h-[200px] sm:h-[320px] border border-dashed border-accent/10 rounded-full pointer-events-none animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '60s' }} />

      {/* ── Main Content Container ────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center relative z-10 max-w-lg"
      >
        {/* Large Outlined 404 Accent */}
        <motion.h1
          variants={itemVariants}
          className="font-heading text-8xl sm:text-[11rem] font-extrabold tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-b from-accent via-accent/60 to-transparent opacity-80 select-none mb-2"
          style={{ WebkitTextStroke: '1px rgba(201, 162, 39, 0.25)' }}
        >
          404
        </motion.h1>

        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          className="font-heading text-2xl sm:text-4xl font-semibold text-secondary uppercase tracking-widest mb-4"
        >
          Page Not Found
        </motion.h2>

        {/* Divider line */}
        <motion.div
          variants={itemVariants}
          className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6"
        />

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="font-body text-xs sm:text-sm text-secondary/45 tracking-wide leading-relaxed mb-8 max-w-sm mx-auto"
        >
          The piece you are looking for does not exist in our current collection. It may have been archived or moved to another atelier.
        </motion.p>

        {/* Back to Home CTA */}
        <motion.div variants={itemVariants}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-primary transition-all duration-500 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest font-body shadow-lg hover:shadow-accent/10 focus:outline-none"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Subtle bottom border glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
    </div>
  );
};

export default NotFound;
