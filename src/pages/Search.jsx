import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiSearch, FiX, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/product/ProductCard';
import productsCatalog from '../data/products';
import { getWishlist, addToWishlist, removeFromWishlist } from '../utils/wishlist';
import { addToCart } from '../utils/cart';

const RECENT_KEY = 'style-sphere-recent-searches';
const trendingTerms = ['Trench Coat', 'Leather Tote', 'Watch', 'Cashmere', 'Velvet Gown'];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(query);
  const [recentSearches, setRecentSearches] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const list = getWishlist();
    const map = {};
    list.forEach((item) => {
      map[item.id] = true;
    });
    return map;
  });
  const [addingToCart, setAddingToCart] = useState({});

  // Sync state parameters with input term changes
  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    try {
      const storedRecent = localStorage.getItem(RECENT_KEY);
      if (storedRecent) {
        setRecentSearches(JSON.parse(storedRecent));
      }
    } catch (e) {
      console.error('Failed to load storage data:', e);
    }
  }, []);

  // Sync search input and push query to URL/recent searches
  const triggerSearch = (term) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    // Update query params
    setSearchParams({ q: trimmed });

    // Update recent searches list
    setRecentSearches((prev) => {
      const filtered = prev.filter((t) => t.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 5); // Cap at 5 searches
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      triggerSearch(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchParams({});
  };

  const runSearch = (term) => {
    setSearchTerm(term);
    triggerSearch(term);
  };

  const deleteRecentSearch = (termToDelete) => {
    setRecentSearches((prev) => {
      const updated = prev.filter((t) => t !== termToDelete);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_KEY);
  };

  const handleWishlistToggle = (product) => {
    const isLiked = wishlist[product.id];
    if (isLiked) {
      removeFromWishlist(product.id);
      setWishlist((prev) => ({ ...prev, [product.id]: false }));
    } else {
      addToWishlist(product);
      setWishlist((prev) => ({ ...prev, [product.id]: true }));
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddingToCart((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  // Memoized query filter
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return productsCatalog.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    );
  }, [query]);

  // Framer Motion layouts
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="min-h-screen bg-primary pt-24 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative luxury gradient orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-blush/3 blur-[135px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 font-body text-[10px] uppercase tracking-widest text-secondary/40 mb-8">
          <Link to="/" className="hover:text-accent transition-colors duration-300">Home</Link>
          <FiChevronRight className="w-3 h-3" />
          <span className="text-accent">Search</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] sm:text-xs font-body tracking-[0.3em] text-accent uppercase font-medium block mb-3">
            Discovery Suite
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-secondary tracking-wide mb-4">
            Search Collections
          </h1>
          <div className="w-16 h-[1px] bg-accent/50 mx-auto mb-8 origin-center" />
        </div>

        {/* Search Input block */}
        <div className="relative max-w-2xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search collections, products, brands..."
              className="w-full bg-card/35 border border-border/40 rounded-xl py-4 pl-12 pr-12 text-sm text-secondary placeholder-secondary/35 focus:outline-none focus:border-accent/60 transition-all duration-300 font-body tracking-wider shadow-soft focus:ring-1 focus:ring-accent/20"
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40 w-4 h-4" />
            
            {/* Input action buttons */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
              {searchTerm && (
                <button
                  onClick={handleClear}
                  className="text-secondary/40 hover:text-secondary transition-colors duration-200 p-1"
                  aria-label="Clear search"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => triggerSearch(searchTerm)}
                className="text-accent hover:text-accent/80 font-body text-xs font-semibold uppercase tracking-widest transition-colors duration-200 border-l border-border/30 pl-3"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Help Panel (Recent and Trending) */}
        <div className="max-w-2xl mx-auto flex flex-col gap-6 mb-16 text-center">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div>
              <span className="font-heading text-[10px] tracking-[0.25em] text-secondary/40 uppercase block mb-3 font-semibold">
                Recent Searches
              </span>
              <div className="flex flex-wrap justify-center items-center gap-2">
                {recentSearches.map((term) => (
                  <div
                    key={term}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/25 bg-card/20 text-xs text-secondary/70 hover:border-accent/40 transition-colors duration-300"
                  >
                    <button
                      onClick={() => runSearch(term)}
                      className="font-body hover:text-accent tracking-wide transition-colors"
                    >
                      {term}
                    </button>
                    <button
                      onClick={() => deleteRecentSearch(term)}
                      className="text-secondary/30 hover:text-red-400 transition-colors duration-200 p-0.5"
                      aria-label={`Remove recent search ${term}`}
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={clearAllRecent}
                  className="font-body text-[10px] uppercase tracking-widest text-accent hover:text-accent/80 transition-colors duration-300 ml-2 font-semibold"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}

          {/* Trending Searches */}
          <div>
            <span className="font-heading text-[10px] tracking-[0.25em] text-secondary/40 uppercase block mb-3 font-semibold">
              Trending Searches
            </span>
            <div className="flex flex-wrap justify-center gap-2.5">
              {trendingTerms.map((term) => (
                <button
                  key={term}
                  onClick={() => runSearch(term)}
                  className="px-4 py-2 border border-border/20 bg-card/15 text-xs text-secondary/70 hover:border-accent/40 hover:text-accent font-body tracking-wider transition-all duration-300 hover:bg-card/30"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Block */}
        <AnimatePresence mode="wait">
          {query.trim() ? (
            filteredProducts.length > 0 ? (
              <motion.div
                key="results-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Result count descriptor */}
                <div className="border-b border-border/10 pb-6 mb-8 flex justify-between items-baseline">
                  <h2 className="font-heading text-lg font-medium text-secondary tracking-wide">
                    Search Results
                  </h2>
                  <span className="font-body text-xs text-secondary/40 tracking-wider">
                    Found {filteredProducts.length} {filteredProducts.length === 1 ? 'masterpiece' : 'pieces'} matching "{query}"
                  </span>
                </div>

                {/* Products Grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isLiked={wishlist[product.id]}
                      isAddingToCart={addingToCart[product.id]}
                      onWishlistToggle={handleWishlistToggle}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              /* No Results State */
              <motion.div
                key="no-results-block"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto text-center py-16 px-4"
              >
                {/* Custom SVG line art empty magnifying glass and sparkles */}
                <div className="relative w-40 h-40 mx-auto mb-8 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-accent/15 border-dashed animate-spin-slow" />
                  
                  <svg className="w-20 h-20 text-accent/60 relative z-10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {/* Magnifying glass */}
                    <circle cx="45" cy="45" r="22" strokeDasharray="3 3" />
                    <line x1="61" y1="61" x2="82" y2="82" strokeWidth="2" />
                    
                    {/* Mini sparkles or crosses */}
                    <path d="M72 25 L74 27 M74 25 L72 27" strokeWidth="1" />
                    <path d="M20 68 L22 70 M22 68 L20 70" strokeWidth="1" />
                    <circle cx="50" cy="45" r="1" fill="currentColor" />
                  </svg>
                </div>

                <h2 className="font-heading text-xl sm:text-2xl font-bold text-secondary tracking-wide mb-3">
                  No pieces found
                </h2>
                
                <p className="font-body text-xs sm:text-sm text-secondary/45 tracking-wide leading-relaxed mb-6 max-w-xs mx-auto">
                  We couldn't find any items matching "{query}". Try checking the spelling or search for trending terms above.
                </p>

                <button
                  onClick={handleClear}
                  className="inline-flex items-center justify-center border border-accent text-accent hover:bg-accent hover:text-primary transition-all duration-300 px-8 py-3 text-xs font-semibold uppercase tracking-widest font-body shadow-lg"
                >
                  Clear Search
                </button>
              </motion.div>
            )
          ) : (
            /* Idle / Pre-Search Vibe */
            <motion.div
              key="idle-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10"
            >
              <p className="font-body text-xs text-secondary/30 uppercase tracking-[0.25em]">
                Enter a search query to explore the atelier.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


    </div>
  );
};

export default Search;
