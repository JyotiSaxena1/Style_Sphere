import ProductSkeleton from './ProductSkeleton';
import CategorySkeleton from './CategorySkeleton';

const PageSkeleton = ({ hasSidebar = false, productCount = 8, hasHero = true }) => {
  const products = Array.from({ length: productCount });

  return (
    <div className="min-h-screen bg-primary pt-24 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background luxury ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-accent/2 blur-[100px] sm:blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section Placeholder */}
        {hasHero && (
          <div className="text-center mb-16 py-12 border-b border-border/10">
            {/* Title placeholder */}
            <div className="h-10 sm:h-14 bg-[#2A2A2A] rounded-md w-2/3 sm:w-1/3 mx-auto mb-4 shimmer" />
            {/* Subtitle placeholder */}
            <div className="h-4 bg-[#2A2A2A]/60 rounded-md w-3/4 sm:w-1/2 mx-auto shimmer" />
          </div>
        )}

        {/* Content Layout Grid/Sidebar */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar placeholder */}
          {hasSidebar && (
            <aside className="hidden lg:block w-[260px] shrink-0 space-y-8">
              {/* Category section */}
              <div className="space-y-4">
                <div className="h-4 bg-[#2A2A2A] rounded-sm w-20 shimmer" />
                <CategorySkeleton count={5} view="list" />
              </div>
              {/* Brands section */}
              <div className="space-y-4 pt-6 border-t border-border/10">
                <div className="h-4 bg-[#2A2A2A] rounded-sm w-24 shimmer" />
                <CategorySkeleton count={4} view="list" />
              </div>
            </aside>
          )}

          {/* Main Content Product Grid placeholder */}
          <div className="flex-1">
            {/* Toolbar/Filters header placeholder */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-border/10">
              <div className="h-4 bg-[#2A2A2A] rounded-sm w-28 shimmer" />
              <div className="h-9 bg-[#2A2A2A] rounded-none w-32 shimmer" />
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {products.map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
