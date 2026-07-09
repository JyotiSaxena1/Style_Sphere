import { useState, useEffect } from 'react';
import { FiSearch, FiHeart, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toastLogoutSuccess } from '../../utils/toast';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('style-sphere-auth') === 'true');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(localStorage.getItem('style-sphere-auth') === 'true');
    };
    window.addEventListener('storage', checkAuth);
    window.addEventListener('storage-auth', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('storage-auth', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('style-sphere-auth');
    localStorage.removeItem('style-sphere-username');
    window.dispatchEvent(new Event('storage-auth'));
    toastLogoutSuccess();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Shop', to: '/shop' },
    { name: 'Women', to: '/shop' },
    { name: 'Men', to: '/shop' },
    { name: 'Beauty', to: '/shop' },
    { name: 'Accessories', to: '/shop' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-primary/90 backdrop-blur-md border-b border-border/40 shadow-soft'
          : 'bg-primary/70 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary hover:text-accent transition-colors duration-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className={`font-body text-xs uppercase tracking-widest transition-colors duration-300 relative group py-2 ${
                  link.isSale ? 'text-accent font-semibold' : 'text-secondary/80 hover:text-accent'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${link.isSale ? 'scale-x-50 group-hover:scale-x-100' : ''}`} />
              </Link>
            ))}
          </nav>

          <div className="flex-1 flex justify-center md:justify-center">
            <Link
              to="/"
              className="font-heading text-xl md:text-2xl font-bold tracking-[0.25em] uppercase text-secondary hover:text-accent transition-colors duration-300"
            >
              Style Sphere
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-secondary hover:text-accent transition-colors duration-300 p-1 focus:outline-none"
                aria-label="Search"
              >
                <FiSearch className="h-5 w-5" />
              </button>
            </div>

            <Link
              to="/wishlist"
              className="text-secondary hover:text-accent transition-colors duration-300 p-1 relative"
              aria-label="Wishlist"
            >
              <FiHeart className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-accent ring-2 ring-primary" />
            </Link>

            <Link
              to="/cart"
              className="text-secondary hover:text-accent transition-colors duration-300 p-1 relative"
              aria-label="Shopping Cart"
            >
              <FiShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-primary">
                2
              </span>
            </Link>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="hidden md:inline-flex items-center justify-center border border-accent/40 text-secondary hover:bg-accent hover:text-primary transition-all duration-300 px-5 py-2 text-xs uppercase tracking-widest font-body focus:outline-none"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="hidden md:inline-flex items-center justify-center border border-accent/40 text-secondary hover:bg-accent hover:text-primary transition-all duration-300 px-5 py-2 text-xs uppercase tracking-widest font-body">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-border/40 bg-primary/95 backdrop-blur-md overflow-hidden"
          >
            <div className="max-w-3xl mx-auto px-4 py-6">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search collections, products, styles..."
                  className="w-full bg-transparent border-b border-border/80 pb-2 text-sm text-secondary placeholder-secondary/40 focus:outline-none focus:border-accent font-body tracking-wider"
                  autoFocus
                  value={headerSearchQuery}
                  onChange={(e) => setHeaderSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const trimmed = headerSearchQuery.trim();
                      if (trimmed) {
                        navigate(`/search?q=${encodeURIComponent(trimmed)}`);
                        setIsOpen(false);
                        setIsSearchOpen(false);
                        setHeaderSearchQuery('');
                      }
                    }
                  }}
                />
                <FiSearch className="absolute right-0 bottom-3 h-5 w-5 text-secondary/40" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border/40 bg-primary/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className={`block py-2 font-body text-sm uppercase tracking-widest border-b border-border/20 ${
                    link.isSale ? 'text-accent font-semibold' : 'text-secondary/80'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col space-y-3">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full py-3 border border-accent/40 text-secondary hover:bg-accent hover:text-primary transition-all duration-300 text-xs uppercase tracking-widest font-body text-center focus:outline-none"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate('/login');
                      setIsOpen(false);
                    }}
                    className="w-full py-3 border border-accent/40 text-secondary hover:bg-accent hover:text-primary transition-all duration-300 text-xs uppercase tracking-widest font-body text-center focus:outline-none"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
