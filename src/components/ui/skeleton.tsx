import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("border rounded-lg p-6 space-y-3", className)}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <Skeleton className="h-8 w-16" />
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  )
}

function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("border rounded-lg p-6 space-y-4", className)}>
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="h-80 w-full">
        <div className="flex h-full items-end justify-around space-x-2 p-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton
              key={i}
              className={`w-8 bg-gradient-to-t from-muted to-muted/50`}
              style={{ height: `${Math.random() * 80 + 20}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function TableSkeleton({ rows = 5, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn("border rounded-lg", className)}>
      <div className="p-6 space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="space-y-0">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center justify-between p-6 border-t">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center space-y-1">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-3 w-12" />
              </div>
              <div className="text-center space-y-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProgressSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("border rounded-lg p-6 space-y-4", className)}>
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-8" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="text-center space-y-2">
            <Skeleton className="h-8 w-16 mx-auto" />
            <Skeleton className="h-3 w-12 mx-auto" />
          </div>
          <div className="text-center space-y-2">
            <Skeleton className="h-8 w-16 mx-auto" />
            <Skeleton className="h-3 w-12 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}

export { Skeleton, CardSkeleton, ChartSkeleton, TableSkeleton, ProgressSkeleton }
