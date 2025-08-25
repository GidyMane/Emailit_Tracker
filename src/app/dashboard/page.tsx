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
  TrendingDown,
  AlertTriangle,
  Shield,
  Users,
  Activity,
  Eye,
  MousePointer,
  RefreshCw,
  BarChart3,
  Crown,
  Calendar,
  Target
} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

interface EmailStats {
  totalSent: number;
  delivered: number;
  failed: number;
  opens: number;
  clicks: number;
  pending: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  recipientOpenRate: number;
  recipientClickRate: number;
  recentActivity: {
    emailsLast7Days: number;
    emailsLast24Hours: number;
    opensLast7Days: number;
    clicksLast7Days: number;
    uniqueRecipients: number;
  };
  detailedStatus: {
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
    summary: unknown;
    createdAt: string;
    updatedAt: string;
  };
  userEmail: string;
  userDomain: string;
}

interface AudienceData {
  overview: {
    totalRecipients: number;
    activeRecipients: number;
    inactiveRecipients: number;
    bouncedRecipients: number;
  };
  engagement: {
    openRate: number;
    clickRate: number;
  };
  isAdmin: boolean;
}

interface StatsResponse {
  stats: EmailStats;
  engagement: {
    recipientsWhoOpened: number;
    recipientsWhoClicked: number;
    totalRecipients: number;
    openRate: number;
    clickRate: number;
  };
  summary: any;
  domainName: string;
  isAdmin: boolean;
  domainsCount: number;
}

export default function DashboardOverview() {
  const [statsData, setStatsData] = useState<StatsResponse | null>(null)
  const [domainData, setDomainData] = useState<DomainData | null>(null)
  const [audienceData, setAudienceData] = useState<AudienceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch all data in parallel
        const [domainResponse, statsResponse, audienceResponse] = await Promise.all([
          fetch('/api/dashboard/domain'),
          fetch('/api/dashboard/stats'),
          fetch('/api/dashboard/audience')
        ])

        if (!domainResponse.ok) {
          throw new Error('Failed to fetch domain data')
        }
        const domainResult = await domainResponse.json()
        setDomainData(domainResult)

        if (!statsResponse.ok) {
          throw new Error('Failed to fetch email statistics')
        }
        const statsResult = await statsResponse.json()
        setStatsData(statsResult)

        if (!audienceResponse.ok) {
          throw new Error('Failed to fetch audience data')
        }
        const audienceResult = await audienceResponse.json()
        setAudienceData(audienceResult)

      } catch (err) {
        console.error('Error fetching overview data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const LoadingSkeleton = () => (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
              <Skeleton className="h-3 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two column layout skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  )

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="text-center space-y-4 py-12">
          <XCircle className="h-16 w-16 text-red-500 mx-auto" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Unable to Load Dashboard</h2>
            <p className="text-muted-foreground max-w-md mx-auto">{error}</p>
          </div>
          <Button onClick={() => window.location.reload()} className="mt-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!statsData) {
    return <div>No data available</div>
  }

  const { stats, engagement, isAdmin, domainName, domainsCount } = statsData

  // Build client-friendly main stats from database
  const clientStatCards = [
    {
      title: "Emails Delivered",
      description: "Successfully reached inboxes",
      icon: CheckCircle,
      value: stats.delivered.toLocaleString(),
      subtitle: `${stats.deliveryRate.toFixed(1)}% delivery rate`,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Email Opens",
      description: "Recipients who viewed your emails",
      icon: MailOpen,
      value: stats.opens.toLocaleString(),
      subtitle: `${stats.openRate.toFixed(1)}% of sent emails opened`,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Click Engagement",
      description: "Recipients who clicked your links",
      icon: MousePointer,
      value: stats.clicks.toLocaleString(),
      subtitle: `${stats.clickRate.toFixed(1)}% of sent emails clicked`,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Recent Activity",
      description: "Emails sent in last 7 days",
      icon: Activity,
      value: stats.recentActivity.emailsLast7Days.toLocaleString(),
      subtitle: `${stats.recentActivity.emailsLast24Hours.toLocaleString()} in last 24h`,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    }
  ]

  // Build admin overview stats from database
  const adminStatCards = [
    {
      title: "Total Volume",
      description: "All emails processed",
      icon: Send,
      value: stats.totalSent.toLocaleString(),
      subtitle: `Across ${domainsCount} domain${domainsCount !== 1 ? 's' : ''}`,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Platform Delivery",
      description: "Overall delivery performance",
      icon: Shield,
      value: `${stats.deliveryRate.toFixed(1)}%`,
      subtitle: `${stats.delivered.toLocaleString()} delivered successfully`,
      color: stats.deliveryRate >= 95 ? "text-green-600" : stats.deliveryRate >= 85 ? "text-yellow-600" : "text-red-600",
      bgColor: stats.deliveryRate >= 95 ? "bg-green-50" : stats.deliveryRate >= 85 ? "bg-yellow-50" : "bg-red-50"
    },
    {
      title: "Platform Engagement",
      description: "Overall open and click rates",
      icon: Activity,
      value: `${((stats.openRate + stats.clickRate) / 2).toFixed(1)}%`,
      subtitle: `${stats.openRate.toFixed(1)}% opens, ${stats.clickRate.toFixed(1)}% clicks`,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Total Recipients",
      description: "Unique email recipients",
      icon: Crown,
      value: engagement.totalRecipients.toLocaleString(),
      subtitle: `${engagement.recipientsWhoOpened.toLocaleString()} opened emails`,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ]

  // Delivery issues breakdown from database
  const issueCards = [
    {
      title: "Hard Failures",
      description: "Permanent delivery failures",
      icon: XCircle,
      value: stats.detailedStatus.hardfail.toLocaleString(),
      action: "Invalid email addresses",
      severity: "high",
      color: "text-red-600",
      bgColor: "bg-red-50",
      count: stats.detailedStatus.hardfail
    },
    {
      title: "Bounced Emails", 
      description: "Rejected by recipient servers",
      icon: TrendingDown,
      value: stats.detailedStatus.bounce.toLocaleString(),
      action: "Domain reputation issues",
      severity: "high",
      color: "text-red-500",
      bgColor: "bg-red-50",
      count: stats.detailedStatus.bounce
    },
    {
      title: "Temporary Issues",
      description: "Soft fails and errors",
      icon: RefreshCw,
      value: (stats.detailedStatus.softfail + stats.detailedStatus.error).toLocaleString(),
      action: "Will retry automatically",
      severity: "medium",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      count: stats.detailedStatus.softfail + stats.detailedStatus.error
    },
    {
      title: "Account Status",
      description: "Held or delayed emails",
      icon: AlertTriangle,
      value: (stats.detailedStatus.held + stats.detailedStatus.delayed).toLocaleString(),
      action: stats.detailedStatus.held > 0 ? "Account under review" : "Rate limited",
      severity: stats.detailedStatus.held > 0 ? "high" : "low",
      color: stats.detailedStatus.held > 0 ? "text-red-600" : "text-blue-600",
      bgColor: stats.detailedStatus.held > 0 ? "bg-red-50" : "bg-blue-50",
      count: stats.detailedStatus.held + stats.detailedStatus.delayed
    }
  ].filter(card => card.count > 0)

  const statsCards = isAdmin ? adminStatCards : clientStatCards

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {isAdmin ? "Platform Overview" : "Email Performance Dashboard"}
          </h1>
          <p className="text-muted-foreground">
            {isAdmin 
              ? `Monitor ${domainsCount} domain${domainsCount !== 1 ? 's' : ''} and ${engagement.totalRecipients.toLocaleString()} total recipients`
              : `Track your email campaigns for ${domainName}`
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isAdmin && <Badge variant="secondary" className="gap-1"><Crown className="h-3 w-3" />Admin</Badge>}
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Statistics from Database */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`size-4 ${stat.color}`} />
                </div>
              </div>
              <CardDescription className="text-xs">{stat.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Summary
            </CardTitle>
            <CardDescription>
              {isAdmin ? "Platform-wide email performance metrics" : "Your email performance breakdown"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium">Delivery Rate</span>
                <span className="text-lg font-bold text-blue-600">{stats.deliveryRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium">Open Rate</span>
                <span className="text-lg font-bold text-purple-600">{stats.openRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-sm font-medium">Click Rate</span>
                <span className="text-lg font-bold text-orange-600">{stats.clickRate.toFixed(1)}%</span>
              </div>
              {isAdmin && (
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium">Unique Recipients</span>
                  <span className="text-lg font-bold text-green-600">{engagement.totalRecipients.toLocaleString()}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity from Database */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Email activity from your database over recent periods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium text-sm">Last 24 Hours</div>
                  <div className="text-xs text-muted-foreground">Emails sent</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{stats.recentActivity.emailsLast24Hours.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium text-sm">Last 7 Days</div>
                  <div className="text-xs text-muted-foreground">Emails sent</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{stats.recentActivity.emailsLast7Days.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium text-sm">Recent Opens</div>
                  <div className="text-xs text-muted-foreground">Last 7 days</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{stats.recentActivity.opensLast7Days.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium text-sm">Recent Clicks</div>
                  <div className="text-xs text-muted-foreground">Last 7 days</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{stats.recentActivity.clicksLast7Days.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delivery Issues from Database */}
      {issueCards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Delivery Issues
            </CardTitle>
            <CardDescription>
              Issues from your database that may affect deliverability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {issueCards.map((issue) => (
                <div key={issue.title} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <issue.icon className={`h-4 w-4 ${issue.color}`} />
                    <div>
                      <div className="font-medium text-sm">{issue.title}</div>
                      <div className="text-xs text-muted-foreground">{issue.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{issue.value}</div>
                    <div className="text-xs text-muted-foreground">{issue.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Engagement Breakdown from Database */}
      <Card>
        <CardHeader>
          <CardTitle>Recipient Engagement</CardTitle>
          <CardDescription>How recipients interact with your emails (from database)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Recipients Who Opened</span>
                <span className="text-sm text-muted-foreground">{stats.recipientOpenRate.toFixed(1)}%</span>
              </div>
              <Progress value={stats.recipientOpenRate} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">
                {engagement.recipientsWhoOpened.toLocaleString()} of {engagement.totalRecipients.toLocaleString()} recipients
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Recipients Who Clicked</span>
                <span className="text-sm text-muted-foreground">{stats.recipientClickRate.toFixed(1)}%</span>
              </div>
              <Progress value={stats.recipientClickRate} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">
                {engagement.recipientsWhoClicked.toLocaleString()} of {engagement.totalRecipients.toLocaleString()} recipients
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            {isAdmin ? "Manage platform operations" : "View detailed reports"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {isAdmin ? (
              <>
                <Button variant="outline" asChild>
                  <a href="/dashboard/domains">
                    <Crown className="h-4 w-4 mr-2" />
                    Manage Domains
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/dashboard/analytics">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/dashboard/audience">
                    <Users className="h-4 w-4 mr-2" />
                    User Management
                  </a>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <a href="/dashboard/analytics">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/dashboard/audience">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Audience
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/dashboard/messages">
                    <Eye className="h-4 w-4 mr-2" />
                    View Messages
                  </a>
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
