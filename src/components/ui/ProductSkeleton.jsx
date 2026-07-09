const ProductSkeleton = () => {
  return (
    <div className="flex flex-col justify-between rounded-xl overflow-hidden shadow-soft border border-border/20 bg-card/45 backdrop-blur-md">
      {/* Image Container Aspect Ratio */}
      <div className="relative aspect-[3/4] overflow-hidden bg-primary/40 shimmer">
        {/* Category/Brand Badge placeholder */}
        <div className="absolute top-4 left-4 z-10 w-14 h-4.5 bg-primary/80 border border-border/30 rounded-none" />
        {/* Wishlist Heart Icon placeholder */}
        <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-primary/70 border border-border/20" />
      </div>

      {/* Info Block */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="mb-4">
          <div className="flex items-center justify-between gap-4 mb-2">
            {/* Title placeholder */}
            <div className="h-4 bg-[#2A2A2A] rounded-sm w-2/3 shimmer" />
            {/* Category placeholder */}
            <div className="h-3 bg-[#2A2A2A] rounded-sm w-12 shimmer" />
          </div>
          {/* Subtitle placeholder */}
          <div className="h-3 bg-[#2A2A2A]/60 rounded-sm w-1/2 shimmer" />
        </div>

        <div className="flex items-baseline justify-between border-t border-border/10 pt-3 mt-auto">
          {/* Prices */}
          <div className="flex items-baseline gap-2 w-1/2">
            <div className="h-4 bg-[#2A2A2A] rounded-sm w-12 shimmer" />
            <div className="h-3 bg-[#2A2A2A]/40 rounded-sm w-8 shimmer" />
          </div>
          {/* Size placeholder */}
          <div className="h-3 bg-[#2A2A2A]/50 rounded-sm w-10 shimmer" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
