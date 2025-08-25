"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { 
  Mail, 
  Eye, 
  MousePointer, 
  Send, 
  Search,
  Filter
} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

interface EmailEventData {
  id: string;
  emailId: number;
  messageId: string;
  to: string;
  from: string;
  subject: string;
  eventType: string;
  status: string;
  timestamp: string;
  createdAt: string;
}

interface PaginationData {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

interface EventsData {
  events: EmailEventData[];
  pagination: PaginationData;
  domainName: string;
}

interface DomainData {
  userDomain: string;
}

export default function MessagesPage() {
  const [eventsData, setEventsData] = useState<EventsData | null>(null)
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

        // Fetch events data
        const eventsResponse = await fetch('/api/dashboard/events')
        if (!eventsResponse.ok) {
          throw new Error('Failed to fetch messages data')
        }
        const eventsResult = await eventsResponse.json()
        setEventsData(eventsResult)

      } catch (err) {
        console.error('Error fetching messages data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load messages data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter messages based on search term and status
  const filteredMessages = React.useMemo(() => {
    if (!eventsData?.events) return []
    
    // Group messages by messageId to show unique emails
    const groupedMessages = eventsData.events.reduce((acc: { [key: string]: EmailEventData }, event: EmailEventData) => {
      // Only include delivery events for messages view
      if (event.eventType.startsWith('email.delivery.')) {
        if (!acc[event.messageId] || new Date(event.timestamp) > new Date(acc[event.messageId].timestamp)) {
          acc[event.messageId] = event;
        }
      }
      return acc;
    }, {})

    let messages = Object.values(groupedMessages)

    // Filter by search term
    if (searchTerm) {
      messages = messages.filter(message => 
        message.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.from.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      messages = messages.filter(message => message.status === statusFilter)
    }

    return messages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [eventsData?.events, searchTerm, statusFilter])

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'sent':
        return 'default'
      case 'hardfail':
      case 'softfail':
      case 'bounce':
      case 'error':
        return 'destructive'
      case 'held':
      case 'delayed':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'sent':
        return 'Delivered'
      case 'hardfail':
        return 'Hard Fail'
      case 'softfail':
        return 'Soft Fail'
      case 'bounce':
        return 'Bounced'
      case 'error':
        return 'Error'
      case 'held':
        return 'Held'
      case 'delayed':
        return 'Delayed'
      default:
        return status
    }
  }

  const TableSkeleton = () => (
    <div className="rounded-lg border">
      <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm text-muted-foreground border-b bg-muted/50">
        <div className="col-span-3">To</div>
        <div className="col-span-4">Subject</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Sent Date</div>
        <div className="col-span-1">Actions</div>
      </div>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="grid grid-cols-12 gap-4 p-4 border-b last:border-b-0">
          <div className="col-span-3 flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <div className="col-span-4 space-y-1">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="col-span-2">
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="col-span-2 space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="col-span-1">
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
      ))}
    </div>
  )

  if (loading) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
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
          <Mail className="h-16 w-16 text-red-500 mx-auto" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Failed to Load Messages</h2>
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
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          All messages sent through {domainData?.userDomain || 'your domain'}
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search messages by recipient, subject, or sender..." 
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
            <option value="sent">Delivered</option>
            <option value="hardfail">Hard Fail</option>
            <option value="softfail">Soft Fail</option>
            <option value="bounce">Bounced</option>
            <option value="error">Error</option>
            <option value="held">Held</option>
            <option value="delayed">Delayed</option>
          </select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
          <CardDescription>
            {filteredMessages.length > 0 
              ? `Showing ${filteredMessages.length} message${filteredMessages.length !== 1 ? 's' : ''}`
              : 'No messages found'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMessages.length > 0 ? (
              <>
                {/* Messages Table */}
                <div className="rounded-lg border overflow-hidden">
                  <div className="overflow-x-auto">
                    <div className="min-w-[800px] grid grid-cols-12 gap-4 p-3 sm:p-4 font-medium text-xs sm:text-sm text-muted-foreground border-b bg-muted/50">
                      <div className="col-span-3">To</div>
                      <div className="col-span-4">Subject</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2">Sent Date</div>
                      <div className="col-span-1">Actions</div>
                    </div>
                    {filteredMessages.slice(0, 50).map((message: EmailEventData) => (
                      <div key={message.messageId} className="min-w-[800px] grid grid-cols-12 gap-4 p-3 sm:p-4 border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                        <div className="col-span-3">
                          <div className="flex items-center gap-2">
                            <div className="flex aspect-square size-6 sm:size-8 items-center justify-center rounded-lg bg-blue-100 flex-shrink-0">
                              <Mail className="size-3 sm:size-4 text-blue-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-xs sm:text-sm truncate" title={message.to}>{message.to}</div>
                              <div className="text-[10px] sm:text-xs text-muted-foreground truncate" title={message.from}>{message.from}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-4">
                          <div className="text-xs sm:text-sm font-medium truncate" title={message.subject}>
                            {message.subject}
                          </div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground">ID: {message.emailId}</div>
                        </div>
                        <div className="col-span-2">
                          <Badge variant={getStatusVariant(message.status)}>
                            {getStatusLabel(message.status)}
                          </Badge>
                        </div>
                        <div className="col-span-2">
                          <div className="text-xs sm:text-sm">
                            {new Date(message.timestamp).toLocaleDateString()}
                          </div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="col-span-1">
                          <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pagination Info */}
                {filteredMessages.length > 50 && (
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div>
                      Showing 50 of {filteredMessages.length} messages
                    </div>
                    <Button variant="outline" size="sm">
                      Load More Messages
                    </Button>
                  </div>
                )}

                {eventsData?.pagination && (
                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                    <div>
                      Total messages from {domainData?.userDomain || 'your domain'}: {eventsData.pagination.total.toLocaleString()}
                    </div>
                    {eventsData.pagination.hasMore && (
                      <Button variant="outline" size="sm">
                        Load More Data
                      </Button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  {searchTerm || statusFilter !== "all" ? "No Messages Found" : "No Messages Yet"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search criteria or filters"
                    : "Messages will appear here once you start sending emails"
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
