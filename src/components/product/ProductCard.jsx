import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiCheck, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ProductCard = ({
  product,
  isLiked,
  isAddingToCart,
  onWishlistToggle,
  onAddToCart,
  onRemove,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col justify-between rounded-xl overflow-hidden shadow-soft border border-border/20 bg-card/45 backdrop-blur-md transition-all duration-300 hover:border-accent/40"
    >
      {/* Image & Badges Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-primary/40">
        <Link to={`/product/${product.id}`} className="absolute inset-0 z-10" aria-label={`View ${product.title}`} />
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-108"
          loading="lazy"
        />

        {/* Dark gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top-left category/brand Badge */}
        <span className="absolute top-4 left-4 z-10 font-body text-[8px] uppercase tracking-widest text-secondary bg-primary/80 backdrop-blur-sm border border-border/30 px-2.5 py-1 rounded-none">
          {product.brand}
        </span>

        {/* Action Button: Remove or Wishlist Toggle */}
        {onRemove ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove(product.id);
            }}
            className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-primary/70 backdrop-blur-sm border border-border/20 text-secondary/80 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-all duration-300 focus:outline-none"
            aria-label="Remove item"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
        ) : onWishlistToggle ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onWishlistToggle(product);
            }}
            className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-primary/70 backdrop-blur-sm border border-border/20 text-secondary hover:bg-secondary hover:text-primary transition-all duration-300 focus:outline-none"
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          >
            <FiHeart
              className={`w-3.5 h-3.5 transition-colors duration-300 ${
                isLiked ? 'fill-accent text-accent' : 'text-secondary/80'
              }`}
            />
          </button>
        ) : null}

        {/* Add to Cart button reveal */}
        {onAddToCart && (
          <div className="absolute inset-x-4 bottom-4 z-20 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart(product);
              }}
              disabled={isAddingToCart}
              className="w-full h-10 inline-flex items-center justify-center gap-2 bg-secondary text-primary font-body text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-accent hover:text-primary transition-colors duration-300 shadow-lg disabled:bg-accent disabled:text-primary focus:outline-none"
            >
              {isAddingToCart ? (
                <>
                  <FiCheck className="w-3.5 h-3.5" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <FiShoppingBag className="w-3.5 h-3.5" />
                  <span>Add To Cart</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Info Block */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="mb-4">
          <div className="flex items-center justify-between gap-2 mb-1">
            <Link to={`/product/${product.id}`} className="hover:text-accent transition-colors duration-300">
              <h3 className="font-heading text-base font-semibold text-secondary tracking-wide group-hover:text-accent transition-colors duration-300 line-clamp-1">
                {product.title}
              </h3>
            </Link>
            <span className="font-body text-[9px] text-accent/80 uppercase tracking-wider shrink-0">
              {product.category}
            </span>
          </div>
          <p className="font-body text-[11px] text-secondary/45 tracking-wide line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        <div className="flex items-baseline justify-between border-t border-border/10 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="font-body text-sm font-semibold text-accent">
              ${product.price}
            </span>
            <span className="font-body text-[10px] text-secondary/35 line-through decoration-secondary/30">
              ${product.originalPrice}
            </span>
          </div>
          {product.size && (
            <span className="font-body text-[9px] text-secondary/40 uppercase tracking-widest">
              Size: {product.size}
            </span>
          )}
        </div>
      </div>

      {/* Bottom highlight gold line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
    </motion.div>
  );
};

export default ProductCard;
