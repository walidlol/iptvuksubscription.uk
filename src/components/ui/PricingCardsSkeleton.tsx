export function PricingCardsSkeleton() {
  return (
    <div className="w-full py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="h-14 w-80 bg-[#1A1A1A] animate-pulse rounded mb-16 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`rounded-2xl overflow-hidden ${i === 2 ? 'md:scale-105' : ''}`}>
              <div className="h-12 bg-[#2A1A1A] animate-pulse" />
              <div className="bg-[#111111] border border-[#1A1A1A] p-8 space-y-4">
                <div className="h-8 w-40 bg-[#1A1A1A] animate-pulse rounded" />
                <div className="h-16 w-32 bg-[#1A1A1A] animate-pulse rounded" />
                <div className="space-y-3 pt-4">
                  {[1,2,3,4,5,6].map(j => (
                    <div key={j} className="h-4 bg-[#1A1A1A] animate-pulse rounded w-full" />
                  ))}
                </div>
                <div className="h-12 bg-[#E8392A]/20 animate-pulse rounded-lg mt-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
