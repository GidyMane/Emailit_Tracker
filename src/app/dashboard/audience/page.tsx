"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { 
  Users, 
  UserCheck, 
  Inbox,
  Search,
  Filter
} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

interface DomainDistribution {
  recipient_domain: string;
  unique_recipients: number;
  total_emails: number;
}

interface AudienceOverview {
  totalRecipients: number;
  activeRecipients: number;
  inactiveRecipients: number;
  bouncedRecipients: number;
}

interface Recipient {
  email: string;
  recipient_domain: string;
  total_emails: number;
  last_seen: string;
  status: string;
}

interface AudienceData {
  audience: Recipient[];
  domainDistribution: DomainDistribution[];
  overview: AudienceOverview;
  engagement: {
    openRate: number;
    clickRate: number;
  };
  domainName: string;
  isAdmin: boolean;
}

interface DomainData {
  userDomain: string;
}

export default function AudiencePage() {
  const [audienceData, setAudienceData] = useState<AudienceData | null>(null)
  const [domainData, setDomainData] = useState<DomainData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch domain data
        const domainResponse = await fetch('/api/dashboard/domain')
        if (domainResponse.ok) {
          const domainResult = await domainResponse.json()
          setDomainData(domainResult)
        }

        // Fetch audience data
        const audienceResponse = await fetch('/api/dashboard/audience')
        if (!audienceResponse.ok) {
          throw new Error('Failed to fetch audience data')
        }
        const audienceResult = await audienceResponse.json()
        setAudienceData(audienceResult)

      } catch (err) {
        console.error('Error fetching audience data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load audience data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter recipients based on search term and status
  const filteredRecipients = React.useMemo(() => {
    if (!audienceData?.audience) return []
    
    let recipients = [...audienceData.audience]

    // Filter by search term
    if (searchTerm) {
      recipients = recipients.filter(recipient => 
        recipient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipient.recipient_domain.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      recipients = recipients.filter(recipient => recipient.status === statusFilter)
    }

    return recipients.sort((a, b) => new Date(b.last_seen).getTime() - new Date(a.last_seen).getTime())
  }, [audienceData?.audience, searchTerm, statusFilter])

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default'
      case 'inactive':
        return 'secondary'
      case 'bounced':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const TableSkeleton = () => (
    <div className="rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[700px] grid grid-cols-12 gap-4 p-3 sm:p-4 font-medium text-xs sm:text-sm text-muted-foreground border-b bg-muted/50">
          <div className="col-span-4">Email Address</div>
          <div className="col-span-2">Domain</div>
          <div className="col-span-2">Total Emails</div>
          <div className="col-span-2">Last Seen</div>
          <div className="col-span-2">Status</div>
        </div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="min-w-[700px] grid grid-cols-12 gap-4 p-3 sm:p-4 border-b last:border-b-0">
            <div className="col-span-4 flex items-center gap-2">
              <Skeleton className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="col-span-2">
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="col-span-2">
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="col-span-2 space-y-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="col-span-2">
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        
        {/* Overview Cards Skeleton */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-8" />
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-12" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <TableSkeleton />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="text-center space-y-4 py-12">
          <Users className="h-16 w-16 text-red-500 mx-auto" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Failed to Load Audience</h2>
            <p className="text-muted-foreground max-w-md mx-auto">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Audience</h1>
        <p className="text-muted-foreground">
          Manage and analyze your email recipients for {domainData?.userDomain || 'your domain'}
        </p>
      </div>

      {/* Domain Distribution & Overview */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recipient Domains</CardTitle>
            <CardDescription>Distribution of recipient email domains</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {audienceData?.domainDistribution && Array.isArray(audienceData.domainDistribution) && audienceData.domainDistribution.length > 0 ? (
                audienceData.domainDistribution.slice(0, 5).map((domain: DomainDistribution) => (
                  <div key={domain.recipient_domain} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{domain.recipient_domain}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground w-12">{domain.unique_recipients}</span>
                      <Badge variant="outline" className="text-xs">
                        {domain.total_emails} emails
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No recipient domains yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audience Overview</CardTitle>
            <CardDescription>Quick stats about your email recipients</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Recipients</span>
              <span className="text-2xl font-bold">{audienceData?.overview?.totalRecipients?.toLocaleString() || '0'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Active</span>
              <span className="text-lg font-semibold text-green-600">{audienceData?.overview?.activeRecipients?.toLocaleString() || '0'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Inactive</span>
              <span className="text-lg font-semibold text-yellow-600">{audienceData?.overview?.inactiveRecipients?.toLocaleString() || '0'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Bounced</span>
              <span className="text-lg font-semibold text-red-600">{audienceData?.overview?.bouncedRecipients?.toLocaleString() || '0'}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search recipients by email or domain..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="bounced">Bounced</option>
          </select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Audience List */}
      <Card>
        <CardHeader>
          <CardTitle>All Recipients</CardTitle>
          <CardDescription>
            {filteredRecipients.length > 0 
              ? `Showing ${filteredRecipients.length} recipient${filteredRecipients.length !== 1 ? 's' : ''}`
              : 'No recipients found'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRecipients.length > 0 ? (
              <>
                {/* Audience Stats Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/30 rounded-lg mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{filteredRecipients.length}</div>
                    <div className="text-sm text-muted-foreground">Total Recipients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {filteredRecipients.filter((r: Recipient) => r.status === 'active').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {filteredRecipients.filter((r: Recipient) => r.status === 'inactive').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Inactive</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {filteredRecipients.filter((r: Recipient) => r.status === 'bounced').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Bounced</div>
                  </div>
                </div>

                {/* Recipients Table */}
                <div className="rounded-lg border overflow-hidden">
                  <div className="overflow-x-auto">
                    <div className="min-w-[700px] grid grid-cols-12 gap-4 p-3 sm:p-4 font-medium text-xs sm:text-sm text-muted-foreground border-b bg-muted/50">
                      <div className="col-span-4">Email Address</div>
                      <div className="col-span-2">Domain</div>
                      <div className="col-span-2">Total Emails</div>
                      <div className="col-span-2">Last Seen</div>
                      <div className="col-span-2">Status</div>
                    </div>
                    {filteredRecipients.slice(0, 50).map((recipient: Recipient) => (
                      <div key={recipient.email} className="min-w-[700px] grid grid-cols-12 gap-4 p-3 sm:p-4 border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                        <div className="col-span-4">
                          <div className="flex items-center gap-2">
                            <div className="flex aspect-square size-6 sm:size-8 items-center justify-center rounded-lg bg-blue-100 flex-shrink-0">
                              <UserCheck className="size-3 sm:size-4 text-blue-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-xs sm:text-sm truncate" title={recipient.email}>{recipient.email}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-xs sm:text-sm">{recipient.recipient_domain}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-xs sm:text-sm font-medium">{recipient.total_emails}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-xs sm:text-sm">
                            {new Date(recipient.last_seen).toLocaleDateString()}
                          </div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground">
                            {new Date(recipient.last_seen).toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="col-span-2">
                          <Badge
                            variant={getStatusVariant(recipient.status)}
                            className="text-xs"
                          >
                            {recipient.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {filteredRecipients.length > 50 && (
                  <div className="text-center text-sm text-muted-foreground">
                    Showing 50 of {filteredRecipients.length} recipients
                    <Button variant="outline" size="sm" className="ml-4">
                      Load More
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Inbox className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  {searchTerm || statusFilter !== "all" ? "No Recipients Found" : "No Recipients Yet"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search criteria or filters"
                    : "Recipients will appear here once you start sending emails"
                  }
                </p>
                {(searchTerm || statusFilter !== "all") && (
                  <div className="mt-4 space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSearchTerm("")}
                    >
                      Clear Search
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setStatusFilter("all")}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
