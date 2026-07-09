import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSearch, FiSliders, FiX, FiChevronRight } from 'react-icons/fi';
import ProductCard from '../components/product/ProductCard';
import initialProducts from '../data/products';
import { getWishlist, addToWishlist, removeFromWishlist } from '../utils/wishlist';
import { addToCart } from '../utils/cart';

const ITEMS_PER_PAGE = 8;

const categories = ['All', 'Women', 'Men', 'Beauty', 'Accessories'];
const brands = ['Dior', 'Gucci', 'Prada', 'Zara', 'Chanel'];
const colors = ['Gold', 'Black', 'White', 'Blush', 'Navy', 'Beige'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'O/S'];

const Shop = () => {
  // Filter States
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(1200);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortOption, setSortOption] = useState('Default');

  // Interactive Wishlist & Pagination States
  const [wishlist, setWishlist] = useState(() => {
    const list = getWishlist();
    const map = {};
    list.forEach((item) => {
      map[item.id] = true;
    });
    return map;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [addingToCart, setAddingToCart] = useState({});

  const toggleWishlist = (product) => {
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

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const handleColorChange = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
    setCurrentPage(1);
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedBrands([]);
    setPriceRange(1200);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSortOption('Default');
    setCurrentPage(1);
  };

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) => selectedColors.includes(p.color));
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) => selectedSizes.includes(p.size));
    }

    result = result.filter((p) => p.price <= priceRange);

    // Sorting
    if (sortOption === 'PriceLowHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'PriceHighLow') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'Popularity') {
      result.sort((a, b) => b.id - a.id); // Mocking popularity by ID order
    }

    return result;
  }, [search, selectedCategory, selectedBrands, priceRange, selectedColors, selectedSizes, sortOption]);

  // Paginated Products
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const SidebarContent = () => (
    <div className="space-y-10">
      {/* Category filter */}
      <div>
        <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-secondary mb-5">
          Categories
        </h4>
        <div className="flex flex-col space-y-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`text-left text-xs uppercase tracking-widest font-body transition-colors duration-300 ${
                selectedCategory === cat ? 'text-accent font-semibold' : 'text-secondary/60 hover:text-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price filter */}
      <div>
        <div className="flex justify-between items-center mb-5">
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-secondary">
            Max Price
          </h4>
          <span className="font-body text-xs text-accent font-semibold">${priceRange}</span>
        </div>
        <input
          type="range"
          min="90"
          max="1200"
          step="10"
          value={priceRange}
          onChange={(e) => {
            setPriceRange(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="w-full accent-accent bg-border/40 h-1 appearance-none cursor-pointer rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-secondary/40 font-body tracking-wider mt-2">
          <span>$90</span>
          <span>$1200</span>
        </div>
      </div>

      {/* Brand filter */}
      <div>
        <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-secondary mb-5">
          Brands
        </h4>
        <div className="space-y-3">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="w-3.5 h-3.5 border border-border/80 bg-transparent text-accent focus:ring-0 focus:ring-offset-0 rounded-none cursor-pointer checked:bg-accent checked:border-accent"
              />
              <span className="font-body text-xs text-secondary/60 uppercase tracking-widest group-hover:text-accent transition-colors duration-300">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors filter */}
      <div>
        <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-secondary mb-5">
          Colors
        </h4>
        <div className="flex flex-wrap gap-2.5">
          {colors.map((color) => {
            const isSelected = selectedColors.includes(color);
            return (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={`px-3 py-1.5 border font-body text-[10px] uppercase tracking-widest transition-all duration-300 ${
                  isSelected
                    ? 'border-accent bg-accent text-primary font-semibold'
                    : 'border-border/40 bg-card/25 text-secondary/65 hover:border-accent/40'
                }`}
              >
                {color}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sizes filter */}
      <div>
        <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-secondary mb-5">
          Sizes
        </h4>
        <div className="flex flex-wrap gap-2.5">
          {sizes.map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`w-9 h-9 border flex items-center justify-center font-body text-[10px] uppercase tracking-widest transition-all duration-300 ${
                  isSelected
                    ? 'border-accent bg-accent text-primary font-semibold'
                    : 'border-border/40 bg-card/25 text-secondary/65 hover:border-accent/40'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset all button */}
      <button
        onClick={resetFilters}
        className="w-full py-3 border border-secondary/20 font-body text-[10px] uppercase tracking-widest text-secondary hover:bg-secondary hover:text-primary hover:border-secondary transition-all duration-300"
      >
        Clear Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-primary pt-20">
      {/* ── 1. Hero Banner ───────────────────────────────────────────────── */}
      <section className="relative w-full h-[320px] md:h-[400px] flex items-center justify-center overflow-hidden">
        {/* Banner image with dark overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
            alt="Shop collection editorial banner"
            className="w-full h-full object-cover object-center brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/50 to-primary" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary tracking-wide mb-4"
          >
            Shop Collection
          </motion.h1>

          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex items-center justify-center gap-2 font-body text-[10px] sm:text-xs uppercase tracking-widest text-secondary/50"
          >
            <a href="#" className="hover:text-accent transition-colors duration-300">
              Home
            </a>
            <FiChevronRight className="w-3 h-3 text-secondary/30" />
            <span className="text-accent font-medium">Shop</span>
          </motion.div>
        </div>
      </section>

      {/* ── Main Catalog Grid & Layout ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* ── 2. Left Sidebar (Desktop Filters) ───────────────────────────── */}
          <aside className="hidden lg:block w-[260px] shrink-0">
            <SidebarContent />
          </aside>

          {/* ── Main Catalog Section ────────────────────────────────────────── */}
          <div className="flex-1">
            
            {/* ── 3. Right Header Controller ────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-10 pb-6 border-b border-border/10">
              
              {/* Product Counter / Mobile Filter Trigger */}
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <p className="font-body text-xs text-secondary/50 uppercase tracking-widest">
                  Showing <span className="text-accent font-semibold">{filteredProducts.length}</span> Products
                </p>

                {/* Mobile Slider filter trigger */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-card/45 border border-border/20 rounded text-secondary font-body text-xs uppercase tracking-wider hover:border-accent hover:text-accent transition-colors duration-300"
                >
                  <FiSliders className="w-3.5 h-3.5" />
                  <span>Filters</span>
                </button>
              </div>

              {/* Search Box & Sort Controller */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full sm:w-auto">
                {/* Search Bar */}
                <div className="relative w-full sm:w-60">
                  <input
                    type="text"
                    placeholder="Search catalog..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full h-10 pl-9 pr-4 bg-card/25 border border-border/30 text-secondary placeholder-secondary/35 text-xs font-body tracking-wider focus:outline-none focus:border-accent/60 transition-colors duration-300"
                  />
                  <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-secondary/30" />
                </div>

                {/* Sorting Dropdown */}
                <select
                  value={sortOption}
                  onChange={(e) => {
                    setSortOption(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-10 px-4 bg-card/25 border border-border/30 text-secondary/70 text-xs font-body uppercase tracking-widest focus:outline-none focus:border-accent/60 transition-colors duration-300 cursor-pointer"
                >
                  <option value="Default" className="bg-primary text-secondary">Sort By</option>
                  <option value="Popularity" className="bg-primary text-secondary">New Arrivals</option>
                  <option value="PriceLowHigh" className="bg-primary text-secondary">Price: Low to High</option>
                  <option value="PriceHighLow" className="bg-primary text-secondary">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* ── 4. Product Grid ───────────────────────────────────────────── */}
            {paginatedProducts.length > 0 ? (
              <motion.div
                layout
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isLiked={wishlist[product.id]}
                      isAddingToCart={addingToCart[product.id]}
                      onWishlistToggle={toggleWishlist}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-20 border border-dashed border-border/40 rounded-xl">
                <p className="font-body text-sm text-secondary/40 uppercase tracking-widest mb-4">
                  No products match your criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-accent text-primary font-body text-xs font-bold uppercase tracking-wider hover:bg-accent/90 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* ── 5. Pagination ─────────────────────────────────────────────── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-16 pt-8 border-t border-border/10">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="px-4 py-2 border border-border/40 font-body text-[10px] uppercase tracking-widest text-secondary hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:text-secondary disabled:hover:border-border/40 transition-colors duration-300"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const pNum = i + 1;
                  return (
                    <button
                      key={pNum}
                      onClick={() => setCurrentPage(pNum)}
                      className={`w-9 h-9 border font-body text-[10px] tracking-widest transition-all duration-300 ${
                        currentPage === pNum
                          ? 'border-accent bg-accent text-primary font-semibold'
                          : 'border-border/40 text-secondary/65 hover:border-accent/40'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="px-4 py-2 border border-border/40 font-body text-[10px] uppercase tracking-widest text-secondary hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:text-secondary disabled:hover:border-border/40 transition-colors duration-300"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 6. Mobile Side Slider Filters Overlay ────────────────────────────── */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-primary z-[99] cursor-pointer"
            />

            {/* Slider Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
              className="fixed right-0 top-0 bottom-0 w-[80%] max-w-[340px] bg-card/95 backdrop-blur-xl border-l border-border/40 z-[100] p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/20">
                <h3 className="font-heading text-lg font-semibold tracking-wider text-secondary uppercase">
                  Filters
                </h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-secondary hover:text-accent transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
