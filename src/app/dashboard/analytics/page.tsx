import { Suspense } from "react"
import EnhancedAnalyticsDashboard from "@/components/enhanced-analytics-dashboard"

export const dynamic = 'force-dynamic'

export default function AnalyticsPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6 p-4 md:p-6">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-muted rounded animate-pulse" />
            <div className="h-4 w-72 bg-muted rounded animate-pulse" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-80 bg-muted rounded animate-pulse" />
            <div className="h-80 bg-muted rounded animate-pulse" />
          </div>
        </div>
      }
    >
      <EnhancedAnalyticsDashboard />
    </Suspense>
  )
}
