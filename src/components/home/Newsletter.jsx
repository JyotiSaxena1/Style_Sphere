import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section className="relative w-full bg-primary py-24 sm:py-32 overflow-hidden px-4 sm:px-6 lg:px-8 border-t border-border/10">
      {/* Decorative blurred background orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-accent/5 blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-10 left-10 w-[250px] h-[250px] rounded-full bg-blush/5 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-sky/5 blur-[110px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative bg-card/30 backdrop-blur-xl border border-border/40 rounded-2xl px-6 py-16 md:p-20 text-center shadow-soft overflow-hidden group"
        >
          {/* Subtle gold accent frame borders inside the card */}
          <span className="absolute top-4 left-4 w-6 h-6 border-t border-l border-accent/30 pointer-events-none" />
          <span className="absolute top-4 right-4 w-6 h-6 border-t border-r border-accent/30 pointer-events-none" />
          <span className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-accent/30 pointer-events-none" />
          <span className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-accent/30 pointer-events-none" />

          {/* Icon Header */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-accent/30 bg-accent/5 text-accent mb-6"
          >
            <FiMail className="w-6 h-6" />
          </motion.div>

          {/* Heading */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary tracking-wide mb-4">
            Join The Style Sphere Club
          </h2>

          {/* Divider */}
          <div className="w-12 h-[1px] bg-accent/50 mx-auto mb-6" />

          {/* Subheading */}
          <p className="font-body text-secondary/60 text-xs sm:text-sm tracking-widest leading-relaxed max-w-lg mx-auto mb-10">
            Subscribe to receive exclusive launches, luxury offers and early access.
          </p>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="relative w-full">
                <input
                  type="email"
                  required
                  placeholder="Enter your luxury email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-5 bg-primary/45 border border-border/80 text-secondary placeholder-secondary/35 text-xs font-body uppercase tracking-[0.15em] focus:outline-none focus:border-accent transition-colors duration-300"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto h-12 px-8 bg-accent text-primary font-body text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-accent/90 shrink-0"
              >
                Subscribe
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-accent font-body text-xs uppercase tracking-[0.2em] py-3 bg-accent/10 border border-accent/20 rounded inline-block px-8"
            >
              Thank you for subscribing to Style Sphere Club.
            </motion.div>
          )}

          {/* Subtle bottom light effect */}
          <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-accent/30 to-transparent transform scale-x-75 group-hover:scale-x-100 transition-transform duration-700" />
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
