export function SectionSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="w-full py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="h-12 w-72 bg-[#1A1A1A] animate-pulse rounded mb-4 mx-auto" />
        <div className="h-4 w-48 bg-[#1A1A1A] animate-pulse rounded mb-16 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="h-64 bg-[#1A1A1A] animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
