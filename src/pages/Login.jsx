import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { toastLoginSuccess } from '../utils/toast';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      const name = email.split('@')[0];
      const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
      localStorage.setItem('style-sphere-auth', 'true');
      localStorage.setItem('style-sphere-username', capitalized);
      window.dispatchEvent(new Event('storage-auth'));
      toastLoginSuccess(capitalized);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-primary pt-24 pb-20 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent/3 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blush/3 blur-[120px] pointer-events-none z-0" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-md w-full border border-border/20 rounded-2xl bg-card/45 backdrop-blur-md p-8 sm:p-10 shadow-soft relative overflow-hidden z-10"
      >
        {/* Decorative corner lines */}
        <span className="absolute top-4 left-4 w-5 h-5 border-t border-l border-accent/20 pointer-events-none" />
        <span className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-accent/20 pointer-events-none" />

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-secondary tracking-wide uppercase">
            Welcome Back
          </h2>
          <div className="w-8 h-[1px] bg-accent/60 mx-auto my-3" />
          <p className="font-body text-[11px] text-secondary/40 tracking-widest uppercase">
            Sign in to access your style profile
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-body text-[10px] uppercase tracking-[0.25em] text-secondary/60">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="charlotte@stylesphere.com"
                className="w-full h-11 pl-10 pr-4 bg-primary/40 border border-border/40 text-secondary placeholder-secondary/25 text-xs font-body tracking-wider focus:outline-none focus:border-accent/60 transition-colors duration-300"
              />
              <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/30 pointer-events-none" />
            </div>
          </div>

          {/* Password input */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="font-body text-[10px] uppercase tracking-[0.25em] text-secondary/60">
                Password
              </label>
              <a href="#" className="font-body text-[10px] uppercase tracking-widest text-accent/80 hover:text-accent transition-colors duration-300">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 pl-10 pr-10 bg-primary/40 border border-border/40 text-secondary placeholder-secondary/25 text-xs font-body tracking-wider focus:outline-none focus:border-accent/60 transition-colors duration-300"
              />
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/30 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/40 hover:text-secondary/70 transition-colors duration-200"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me toggle */}
          <div className="flex items-center">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-9 h-4.5 rounded-full border flex items-center transition-all duration-300 relative ${
                  rememberMe ? 'bg-accent border-accent' : 'bg-transparent border-border/40'
                }`}
              >
                <motion.div
                  animate={{ x: rememberMe ? 18 : 2 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  className={`absolute w-3 h-3 rounded-full transition-colors duration-300 ${rememberMe ? 'bg-primary' : 'bg-secondary/40'}`}
                />
              </div>
              <span className="font-body text-[11px] uppercase tracking-widest text-secondary/50 group-hover:text-secondary transition-colors duration-300">
                Remember Me
              </span>
            </label>
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-12 bg-accent text-primary font-body text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-accent/90 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Verifying Profile...</span>
            ) : (
              <>
                <span>Sign In</span>
                <FiArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="relative my-7">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/10"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
            <span className="bg-[#191919] px-3 text-secondary/30">Or Continue With</span>
          </div>
        </div>

        {/* Google sign-in */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          className="w-full h-12 border border-border/30 hover:border-accent/40 font-body text-[10px] uppercase tracking-[0.2em] text-secondary flex items-center justify-center gap-3 transition-colors duration-300"
        >
          <FcGoogle className="w-4.5 h-4.5" />
          <span>Google Accounts</span>
        </motion.button>

        {/* Register Redirect */}
        <p className="text-center font-body text-xs text-secondary/40 tracking-wider mt-8">
          Don't have a profile yet?{' '}
          <Link to="/register" className="text-accent font-semibold hover:underline">
            Register Here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
