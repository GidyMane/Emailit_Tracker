"use client"

import { useState, useEffect } from 'react'
import SuppressionsList from '@/components/suppressions-list'
import SuppressionsSearch from '@/components/suppressions-search'
import { Loader2 } from 'lucide-react'

interface AudienceData {
  isAdmin: boolean
}

export default function SuppressionsPage() {
  const [audienceData, setAudienceData] = useState<AudienceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null)

  useEffect(() => {
    const fetchAudienceData = async () => {
      try {
        const storedDomainId = localStorage.getItem('selectedDomainId')
        setSelectedDomainId(storedDomainId)

        const params = new URLSearchParams()
        if (storedDomainId && storedDomainId !== 'all') {
          params.append('domainId', storedDomainId)
        }

        const response = await fetch(`/api/dashboard/audience${params.toString() ? `?${params.toString()}` : ''}`)
        if (response.ok) {
          const data = await response.json()
          setAudienceData(data)
        }
      } catch (error) {
        console.error('Error fetching audience data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAudienceData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading...</span>
      </div>
    )
  }

  const isAdmin = audienceData?.isAdmin || false

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

      {isAdmin ? <SuppressionsList selectedDomainId={selectedDomainId} /> : <SuppressionsSearch />}
    </div>
  )
}
