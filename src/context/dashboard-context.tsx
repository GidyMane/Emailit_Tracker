'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DomainSummaryData {
  totalSent: number
  totalHardFail: number
  totalSoftFail: number
  totalBounce: number
  totalError: number
  totalHeld: number
  totalDelayed: number
  totalLoaded: number
  totalClicked: number
}

export interface DomainInfo {
  id: string
  name: string
  emailCount: number
  summary: DomainSummaryData | null
}

export interface DomainData {
  domain: {
    id: string
    name: string
    emailCount: number
    summary: DomainSummaryData | null
    createdAt: string
    updatedAt: string
  }
  userEmail: string
  userDomain: string
  isAdmin?: boolean
  allDomains?: DomainInfo[]
}

export interface AudienceData {
  isAdmin: boolean
  overview?: {
    totalRecipients: number
    totalEmailsSent: number
    totalOpens: number
    totalClicks: number
    averageOpenRate: number
    averageClickRate: number
  }
  recipients?: unknown[]
  pagination?: unknown
  domainName?: string
}

export interface DashboardContextValue {
  domainData: DomainData | null
  audienceData: AudienceData | null
  loading: boolean
  selectedDomainId: string | null
  selectedDomainName: string | null
  isAdmin: boolean
  /** Switch the active domain without a full page reload */
  setSelectedDomain: (id: string, name: string) => void
  /** Manually re-fetch domain + audience data */
  refresh: () => void
}

// ─── Context ──────────────────────────────────────────────────────────────────

const DashboardContext = createContext<DashboardContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [domainData, setDomainData] = useState<DomainData | null>(null)
  const [audienceData, setAudienceData] = useState<AudienceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null)
  const [selectedDomainName, setSelectedDomainName] = useState<string | null>(null)

  // Derived convenience flag so pages never have to check both objects
  const isAdmin = audienceData?.isAdmin ?? domainData?.isAdmin ?? false

  const fetchData = useCallback(async (domainId: string | null) => {
    setLoading(true)
    try {
      const qs =
        domainId && domainId !== 'all'
          ? `?domainId=${encodeURIComponent(domainId)}`
          : ''

      // Fire both requests in parallel — same as before, just done once
      const [domainRes, audienceRes] = await Promise.all([
        fetch(`/api/dashboard/domain${qs}`),
        fetch(`/api/dashboard/audience${qs}`),
      ])

      if (domainRes.ok) {
        setDomainData(await domainRes.json())
      } else {
        console.error('[DashboardContext] domain fetch failed:', domainRes.status)
      }

      if (audienceRes.ok) {
        setAudienceData(await audienceRes.json())
      } else {
        console.error('[DashboardContext] audience fetch failed:', audienceRes.status)
      }
    } catch (err) {
      console.error('[DashboardContext] Error fetching layout data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // On mount: read localStorage once, then fetch
  useEffect(() => {
    const id = localStorage.getItem('selectedDomainId')
    const name = localStorage.getItem('selectedDomainName')
    setSelectedDomainId(id)
    setSelectedDomainName(name)
    fetchData(id)
  }, [fetchData])

  /** Switch domain without reloading the page */
  const setSelectedDomain = useCallback(
    (id: string, name: string) => {
      localStorage.setItem('selectedDomainId', id)
      localStorage.setItem('selectedDomainName', name)
      setSelectedDomainId(id)
      setSelectedDomainName(name)
      fetchData(id)
    },
    [fetchData]
  )

  const refresh = useCallback(() => {
    fetchData(selectedDomainId)
  }, [fetchData, selectedDomainId])

  return (
    <DashboardContext.Provider
      value={{
        domainData,
        audienceData,
        loading,
        selectedDomainId,
        selectedDomainName,
        isAdmin,
        setSelectedDomain,
        refresh,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useDashboard(): DashboardContextValue {
  const ctx = useContext(DashboardContext)
  if (!ctx) {
    throw new Error('useDashboard() must be called inside a <DashboardProvider>.')
  }
  return ctx
}
