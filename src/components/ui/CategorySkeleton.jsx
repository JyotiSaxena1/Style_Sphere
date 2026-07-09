const CategorySkeleton = ({ count = 5, view = 'pills' }) => {
  const items = Array.from({ length: count });

  if (view === 'list') {
    return (
      <div className="space-y-4 w-full">
        {items.map((_, index) => (
          <div key={index} className="flex items-center gap-3">
            {/* Checkbox indicator placeholder */}
            <div className="w-4 h-4 bg-[#2A2A2A] rounded-none shimmer border border-border/10 shrink-0" />
            {/* Label text placeholder */}
            <div className="h-4 bg-[#2A2A2A] rounded-sm w-24 shimmer" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((_, index) => (
        <div
          key={index}
          className="h-9 w-20 sm:w-24 bg-card/45 border border-border/20 rounded-none shimmer shrink-0"
        />
      ))}
    </div>
  );
};

export default CategorySkeleton;
