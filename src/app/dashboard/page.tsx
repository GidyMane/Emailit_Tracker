"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { 
  Send, 
  CheckCircle, 
  XCircle, 
  MailOpen, 
  Zap, 
  Clock, 
  TrendingUp, 
  TrendingDown 
} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface EmailStats {
  totalSent: number;
  delivered: number;
  failed: number;
  opens: number;
  clicks: number;
  pending: number;
  deliveryRate: number;
  detailedStatus?: {
    sent: number;
    hardfail: number;
    softfail: number;
    bounce: number;
    error: number;
    held: number;
    delayed: number;
  };
}

interface DomainData {
  domain: {
    id: string;
    name: string;
    emailCount: number;
    summary: any;
    createdAt: string;
    updatedAt: string;
  };
  userEmail: string;
  userDomain: string;
}

export default function DashboardOverview() {
  const [emailStats, setEmailStats] = useState<EmailStats | null>(null)
  const [domainData, setDomainData] = useState<DomainData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch domain data
        const domainResponse = await fetch('/api/dashboard/domain')
        if (!domainResponse.ok) {
          throw new Error('Failed to fetch domain data')
        }
        const domainResult = await domainResponse.json()
        setDomainData(domainResult)

        // Fetch email statistics
        const statsResponse = await fetch('/api/dashboard/stats')
        if (!statsResponse.ok) {
          throw new Error('Failed to fetch email statistics')
        }
        const statsResult = await statsResponse.json()
        setEmailStats(statsResult.stats)

      } catch (err) {
        console.error('Error fetching overview data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Build email stats cards from API data
  const emailStatCards = emailStats ? [
    {
      title: "Total Sent",
      icon: Send,
      value: emailStats.totalSent.toLocaleString(),
      change: "",
      trend: "up",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Delivered",
      icon: CheckCircle,
      value: emailStats.delivered.toLocaleString(),
      change: `${emailStats.deliveryRate}%`,
      trend: "up",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Failed",
      icon: XCircle,
      value: emailStats.failed.toLocaleString(),
      change: "",
      trend: "down",
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      title: "Opens",
      icon: MailOpen,
      value: emailStats.opens.toLocaleString(),
      change: "",
      trend: "up",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Clicks",
      icon: Zap,
      value: emailStats.clicks.toLocaleString(),
      change: "",
      trend: "up",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Pending",
      icon: Clock,
      value: emailStats.pending.toLocaleString(),
      change: "",
      trend: "up",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    }
  ] : []

  // Build detailed delivery status cards
  const detailedStatusCards = emailStats?.detailedStatus ? [
    {
      title: "Sent Successfully",
      icon: CheckCircle,
      value: emailStats.detailedStatus.sent.toLocaleString(),
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "Emails successfully delivered"
    },
    {
      title: "Hard Fail",
      icon: XCircle,
      value: emailStats.detailedStatus.hardfail.toLocaleString(),
      color: "text-red-600",
      bgColor: "bg-red-100",
      description: "Permanent delivery failures"
    },
    {
      title: "Soft Fail",
      icon: Clock,
      value: emailStats.detailedStatus.softfail.toLocaleString(),
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      description: "Temporary failures, will retry"
    },
    {
      title: "Bounced",
      icon: TrendingDown,
      value: emailStats.detailedStatus.bounce.toLocaleString(),
      color: "text-red-500",
      bgColor: "bg-red-50",
      description: "Emails bounced back"
    },
    {
      title: "System Error",
      icon: XCircle,
      value: emailStats.detailedStatus.error.toLocaleString(),
      color: "text-gray-600",
      bgColor: "bg-gray-100",
      description: "System errors, will retry"
    },
    {
      title: "Held",
      icon: Clock,
      value: emailStats.detailedStatus.held.toLocaleString(),
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      description: "Account under review"
    },
    {
      title: "Delayed",
      icon: Clock,
      value: emailStats.detailedStatus.delayed.toLocaleString(),
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      description: "Rate limited, delayed"
    }
  ] : []

  // Empty states
  const EmptyStateCard = ({ title, description, icon: Icon }: { title: string, description: string, icon: React.ComponentType<{ className?: string }> }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="p-2 rounded-lg bg-gray-100">
          <Icon className="size-4 text-gray-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">0</div>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        {/* Loading skeleton for stats cards */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Loading skeleton for detailed status */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-48" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-8 rounded-lg" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Loading skeleton for delivery rate */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-2 w-full" />
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center">
                <Skeleton className="h-8 w-16 mx-auto mb-1" />
                <Skeleton className="h-4 w-12 mx-auto" />
              </div>
              <div className="text-center">
                <Skeleton className="h-8 w-16 mx-auto mb-1" />
                <Skeleton className="h-4 w-12 mx-auto" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="text-center space-y-4 py-12">
          <XCircle className="h-16 w-16 text-red-500 mx-auto" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Failed to Load Data</h2>
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
      {/* Email Summary Stats */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {emailStatCards.length > 0 ? emailStatCards.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6 pt-4 sm:pt-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-1.5 sm:p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`size-3 sm:size-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground mt-2">
                  <div className="flex items-center">
                    {stat.trend === "up" ? (
                      <TrendingUp className="size-3 sm:size-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="size-3 sm:size-4 text-red-500 mr-1" />
                    )}
                    <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                      {stat.change}
                    </span>
                  </div>
                  <span>delivery rate</span>
                </div>
              )}
            </CardContent>
          </Card>
        )) : (
          <>
            <EmptyStateCard key="sent" title="Total Sent" description="No emails sent yet" icon={Send} />
            <EmptyStateCard key="delivered" title="Delivered" description="No deliveries yet" icon={CheckCircle} />
            <EmptyStateCard key="failed" title="Failed" description="No failures yet" icon={XCircle} />
            <EmptyStateCard key="opens" title="Opens" description="No opens yet" icon={MailOpen} />
            <EmptyStateCard key="clicks" title="Clicks" description="No clicks yet" icon={Zap} />
            <EmptyStateCard key="pending" title="Pending" description="No pending emails" icon={Clock} />
          </>
        )}
      </div>

      {/* Detailed Delivery Status */}
      {detailedStatusCards.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Detailed Delivery Status</h3>
            <Badge variant="outline">Last 30 days</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {detailedStatusCards.map((stat) => (
              <Card key={stat.title} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`size-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Delivery Rate Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Performance</CardTitle>
          <CardDescription>Email delivery success rate for {domainData?.userDomain || 'your domain'}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Delivery Rate</span>
            <span className="text-sm text-muted-foreground">{emailStats?.deliveryRate || 0}%</span>
          </div>
          <Progress value={emailStats?.deliveryRate || 0} className="h-2" />
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{emailStats?.delivered?.toLocaleString() || '0'}</div>
              <div className="text-sm text-muted-foreground">Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{emailStats?.failed?.toLocaleString() || '0'}</div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
