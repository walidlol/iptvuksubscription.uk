interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`bg-[#1A1A1A] animate-pulse rounded-lg ${className}`}
      aria-hidden="true"
    />
  )
}

export function MatchCardSkeleton() {
  return (
    <div className="flex-none w-64 bg-[#1A1A1A] rounded-xl p-4 border border-white/[0.06] animate-pulse">
      <Skeleton className="h-3 w-24 mb-3" />
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-6 w-12" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="h-3 w-full mt-2" />
    </div>
  )
}

export function PosterCardSkeleton() {
  return (
    <div className="animate-pulse">
      <Skeleton className="aspect-[2/3] w-full rounded-xl mb-2" />
      <Skeleton className="h-3 w-3/4 mb-1" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  )
}

export function NewsCardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-3 p-5 bg-[#111111] rounded-xl border border-white/[0.06]">
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-3 w-1/3 mt-1" />
    </div>
  )
}
