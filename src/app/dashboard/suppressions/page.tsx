"use client"

import SuppressionsList from '@/components/suppressions-list'
import SuppressionsSearch from '@/components/suppressions-search'

// Fix 1: isAdmin and selectedDomainId come from context — no extra fetch needed
import { useDashboard } from '@/context/dashboard-context'

export default function SuppressionsPage() {
  const { isAdmin, selectedDomainId, loading } = useDashboard()

  // Show nothing (layout already shows a skeleton) until context is ready
  if (loading) return null

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Suppressions</h1>
        <p className="text-muted-foreground">
          {isAdmin
            ? 'View and manage suppressed email addresses for your domain.'
            : 'Search for suppressed email addresses in your domain and remove them if needed.'}
        </p>
      </div>

      {isAdmin ? (
        <div className="flex flex-col gap-6">
          <SuppressionsSearch />
          <SuppressionsList selectedDomainId={selectedDomainId} />
        </div>
      ) : (
        <SuppressionsSearch />
      )}
    </div>
  )
}
