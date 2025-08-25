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
  Target,
  Users,
  Activity,
  Award,
  Eye,
  MousePointer,
  Timer,
  Pause,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Sparkles,
  BarChart3,
  TrendingUpIcon,
  Crown
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

export default function DashboardOverview() {
  const [emailStats, setEmailStats] = useState<EmailStats | null>(null)
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
        setEmailStats(statsResult.stats)

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

  // Calculate health score based on delivery rate, engagement, and issues
  const getHealthScore = (): { score: number; status: string; color: string; description: string } => {
    if (!emailStats || !audienceData) {
      return { score: 0, status: "Unknown", color: "text-gray-500", description: "No data available" }
    }

    let score = 0
    const weights = {
      delivery: 40,
      engagement: 30,
      reputation: 20,
      activity: 10
    }

    // Delivery rate scoring (0-40 points)
    const deliveryScore = Math.min(emailStats.deliveryRate / 100 * weights.delivery, weights.delivery)
    score += deliveryScore

    // Engagement scoring (0-30 points)
    const avgEngagement = (audienceData.engagement.openRate + audienceData.engagement.clickRate) / 2
    const engagementScore = Math.min(avgEngagement / 30 * weights.engagement, weights.engagement) // 30% is excellent
    score += engagementScore

    // Reputation scoring (0-20 points) - based on bounce/fail rates
    const totalAttempts = emailStats.totalSent || 1
    const problemRate = (emailStats.detailedStatus?.bounce || 0 + emailStats.detailedStatus?.hardfail || 0) / totalAttempts
    const reputationScore = Math.max(weights.reputation - (problemRate * weights.reputation * 5), 0)
    score += reputationScore

    // Activity scoring (0-10 points)
    const hasActivity = emailStats.totalSent > 0 ? weights.activity : 0
    score += hasActivity

    const finalScore = Math.round(score)

    if (finalScore >= 85) {
      return { 
        score: finalScore, 
        status: "Excellent", 
        color: "text-green-600", 
        description: "Your email performance is outstanding! Keep up the great work." 
      }
    } else if (finalScore >= 70) {
      return { 
        score: finalScore, 
        status: "Good", 
        color: "text-blue-600", 
        description: "Your email performance is solid with room for improvement." 
      }
    } else if (finalScore >= 50) {
      return { 
        score: finalScore, 
        status: "Fair", 
        color: "text-yellow-600", 
        description: "Your email performance needs attention. Check delivery and engagement rates." 
      }
    } else {
      return { 
        score: finalScore, 
        status: "Poor", 
        color: "text-red-600", 
        description: "Your email performance requires immediate attention. Review your strategy." 
      }
    }
  }

  // Get recommendations based on data
  const getRecommendations = (): string[] => {
    if (!emailStats || !audienceData) return []
    
    const recommendations: string[] = []
    
    if (emailStats.deliveryRate < 95) {
      recommendations.push("Improve deliverability by cleaning your email list and checking domain reputation")
    }
    
    if (audienceData.engagement.openRate < 20) {
      recommendations.push("Enhance subject lines to increase open rates")
    }
    
    if (audienceData.engagement.clickRate < 3) {
      recommendations.push("Optimize email content and calls-to-action to boost engagement")
    }
    
    if (emailStats.detailedStatus?.held && emailStats.detailedStatus.held > 0) {
      recommendations.push("Account under review - contact support to resolve sending issues")
    }
    
    if (emailStats.detailedStatus?.bounce && emailStats.detailedStatus.bounce > emailStats.totalSent * 0.05) {
      recommendations.push("High bounce rate detected - clean your email list immediately")
    }

    return recommendations.slice(0, 3) // Show top 3 recommendations
  }

  const healthScore = getHealthScore()
  const recommendations = getRecommendations()

  // Build client-friendly main stats
  const clientStatCards = emailStats && audienceData ? [
    {
      title: "Emails Delivered",
      description: "Successfully reached inboxes",
      icon: CheckCircle,
      value: emailStats.delivered.toLocaleString(),
      subtitle: `${emailStats.deliveryRate.toFixed(1)}% success rate`,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: emailStats.deliveryRate >= 95 ? "excellent" : emailStats.deliveryRate >= 85 ? "good" : "needs-attention"
    },
    {
      title: "Email Opens",
      description: "Recipients who viewed your emails",
      icon: MailOpen,
      value: emailStats.opens.toLocaleString(),
      subtitle: `${audienceData.engagement.openRate}% open rate`,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: audienceData.engagement.openRate >= 25 ? "excellent" : audienceData.engagement.openRate >= 15 ? "good" : "needs-attention"
    },
    {
      title: "Click Engagement",
      description: "Recipients who clicked your links",
      icon: MousePointer,
      value: emailStats.clicks.toLocaleString(),
      subtitle: `${audienceData.engagement.clickRate}% click rate`,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: audienceData.engagement.clickRate >= 5 ? "excellent" : audienceData.engagement.clickRate >= 2 ? "good" : "needs-attention"
    },
    {
      title: "Active Audience",
      description: "Engaged recipients last 7 days",
      icon: Users,
      value: audienceData.overview.activeRecipients.toLocaleString(),
      subtitle: `${audienceData.overview.totalRecipients.toLocaleString()} total recipients`,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: audienceData.overview.activeRecipients > audienceData.overview.totalRecipients * 0.3 ? "excellent" : "good"
    }
  ] : []

  // Build admin overview stats
  const adminStatCards = emailStats && audienceData ? [
    {
      title: "Total Volume",
      description: "All emails processed",
      icon: Send,
      value: emailStats.totalSent.toLocaleString(),
      subtitle: `${emailStats.delivered.toLocaleString()} delivered successfully`,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Delivery Health",
      description: "Overall delivery performance",
      icon: Shield,
      value: `${emailStats.deliveryRate.toFixed(1)}%`,
      subtitle: "Platform delivery rate",
      color: emailStats.deliveryRate >= 95 ? "text-green-600" : emailStats.deliveryRate >= 85 ? "text-yellow-600" : "text-red-600",
      bgColor: emailStats.deliveryRate >= 95 ? "bg-green-50" : emailStats.deliveryRate >= 85 ? "bg-yellow-50" : "bg-red-50"
    },
    {
      title: "Platform Engagement",
      description: "Average engagement rates",
      icon: Activity,
      value: `${((audienceData.engagement.openRate + audienceData.engagement.clickRate) / 2).toFixed(1)}%`,
      subtitle: `${audienceData.engagement.openRate}% opens, ${audienceData.engagement.clickRate}% clicks`,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Active Users",
      description: "Total platform audience",
      icon: Crown,
      value: audienceData.overview.totalRecipients.toLocaleString(),
      subtitle: `${audienceData.overview.activeRecipients.toLocaleString()} recently active`,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ] : []

  // Delivery issues breakdown for both client and admin
  const issueCards = emailStats?.detailedStatus ? [
    {
      title: "Hard Failures",
      description: "Permanent delivery failures - invalid emails",
      icon: XCircle,
      value: emailStats.detailedStatus.hardfail.toLocaleString(),
      action: "Clean email list",
      severity: "high",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Bounced Emails", 
      description: "Emails rejected by recipient servers",
      icon: TrendingDown,
      value: emailStats.detailedStatus.bounce.toLocaleString(),
      action: "Check domain reputation",
      severity: "high",
      color: "text-red-500",
      bgColor: "bg-red-50"
    },
    {
      title: "Temporary Issues",
      description: "Will retry automatically",
      icon: RefreshCw,
      value: (emailStats.detailedStatus.softfail + emailStats.detailedStatus.error).toLocaleString(),
      action: "Monitor for resolution",
      severity: "medium",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Account Status",
      description: "Held or delayed emails",
      icon: AlertTriangle,
      value: (emailStats.detailedStatus.held + emailStats.detailedStatus.delayed).toLocaleString(),
      action: emailStats.detailedStatus.held > 0 ? "Contact support" : "Rate limited",
      severity: emailStats.detailedStatus.held > 0 ? "high" : "low",
      color: emailStats.detailedStatus.held > 0 ? "text-red-600" : "text-blue-600",
      bgColor: emailStats.detailedStatus.held > 0 ? "bg-red-50" : "bg-blue-50"
    }
  ].filter(card => parseInt(card.value.replace(/,/g, '')) > 0) : []

  const LoadingSkeleton = () => (
    <div className="space-y-6 p-4 md:p-6">
      {/* Health Score Skeleton */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-48" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-64" />
            </div>
          </div>
        </CardContent>
      </Card>

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

      {/* Additional skeletons for recommendations and issues */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
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

  const isAdmin = audienceData?.isAdmin
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
              ? "Monitor overall platform health and user engagement"
              : `Track your email campaigns for ${domainData?.userDomain || 'your domain'}`
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

      {/* Health Score - Only for clients */}
      {!isAdmin && emailStats && (
        <Card className="border-l-4" style={{ borderLeftColor: healthScore.color.includes('green') ? '#16a34a' : healthScore.color.includes('blue') ? '#2563eb' : healthScore.color.includes('yellow') ? '#ca8a04' : '#dc2626' }}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className={`h-5 w-5 ${healthScore.color}`} />
              <CardTitle>Email Health Score</CardTitle>
              <Badge variant={healthScore.status === "Excellent" ? "default" : healthScore.status === "Good" ? "secondary" : "destructive"}>
                {healthScore.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className={`w-16 h-16 rounded-full border-4 border-current ${healthScore.color} flex items-center justify-center font-bold text-lg`}>
                  {healthScore.score}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">{healthScore.description}</p>
                <Progress value={healthScore.score} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Statistics */}
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
              {'trend' in stat && (
                <div className="flex items-center mt-2">
                  {stat.trend === "excellent" ? (
                    <div className="flex items-center text-green-600 text-xs">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Excellent
                    </div>
                  ) : stat.trend === "good" ? (
                    <div className="flex items-center text-blue-600 text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Good
                    </div>
                  ) : (
                    <div className="flex items-center text-yellow-600 text-xs">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Needs Attention
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recommendations for Clients / Platform Insights for Admin */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isAdmin ? <BarChart3 className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
              {isAdmin ? "Platform Insights" : "Recommendations"}
            </CardTitle>
            <CardDescription>
              {isAdmin ? "Key metrics and trends across the platform" : "Ways to improve your email performance"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isAdmin ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium">Platform Delivery Rate</span>
                  <span className="text-lg font-bold text-blue-600">{emailStats?.deliveryRate.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium">Avg. Engagement Rate</span>
                  <span className="text-lg font-bold text-purple-600">
                    {((audienceData?.engagement.openRate || 0) + (audienceData?.engagement.clickRate || 0) / 2).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium">Active Users</span>
                  <span className="text-lg font-bold text-green-600">{audienceData?.overview.activeRecipients.toLocaleString()}</span>
                </div>
              </div>
            ) : recommendations.length > 0 ? (
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <TrendingUpIcon className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Award className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Great job! Your email performance is optimal.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delivery Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              {isAdmin ? "Platform Issues" : "Delivery Issues"}
            </CardTitle>
            <CardDescription>
              {isAdmin ? "Problems affecting the platform" : "Issues that may affect your deliverability"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {issueCards.length > 0 ? (
              <div className="space-y-3">
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
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  {isAdmin ? "No platform issues detected" : "No delivery issues detected. Your emails are being delivered successfully!"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            {isAdmin ? "Manage platform operations" : "Improve your email performance"}
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
