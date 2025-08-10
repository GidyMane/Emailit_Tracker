"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { BarChart3, Bell, ChevronDown, FileText, Home, Inbox, Mail, MailOpen, Search, Send, Settings, TrendingUp, TrendingDown, Users, Zap, UserCheck, XCircle, CheckCircle, Clock } from 'lucide-react'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

const navigation = [
  {
    title: "Main Navigation",
    items: [
      { title: "Dashboard", icon: Home, url: "#", isActive: true },
      { title: "Campaigns", icon: Mail, url: "#" },
      { title: "Templates", icon: FileText, url: "#" },
      { title: "Audience", icon: Users, url: "#" },
      { title: "Analytics", icon: BarChart3, url: "#" },
    ]
  },
  {
    title: "Email Tools",
    items: [
      { title: "Inbox", icon: Inbox, url: "#" },
      { title: "Sent", icon: Send, url: "#" },
      { title: "Drafts", icon: FileText, url: "#" },
      { title: "Automation", icon: Zap, url: "#" },
    ]
  }
]

interface DomainData {
  domain: {
    id: string;
    name: string;
    emailCount: number;
    summary: EmailSummary | null;
    createdAt: string;
    updatedAt: string;
  };
  userEmail: string;
  userDomain: string;
}

interface EmailSummary {
  totalSent: number;
  totalDelivered: number;
  totalFailed: number;
  totalOpens: number;
  totalClicks: number;
}

interface EmailStats {
  totalSent: number;
  delivered: number;
  failed: number;
  opens: number;
  clicks: number;
  pending: number;
  deliveryRate: number;
}

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
}

interface VolumeData {
  date: string;
  total: number;
  delivered: number;
  failed: number;
  opens: number;
  clicks: number;
}

interface EngagementChartData {
  day_name: string;
  opens: number;
  clicks: number;
}

interface ChartData {
  volume: VolumeData[];
  engagement: EngagementChartData[];
}

interface EmailEventData {
  id: string;
  emailId: number;
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
  charts: ChartData;
  domainName: string;
}

export function EnhancedEmailDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [domainData, setDomainData] = useState<DomainData | null>(null)
  const [emailStats, setEmailStats] = useState<EmailStats | null>(null)
  const [audienceData, setAudienceData] = useState<AudienceData | null>(null)
  const [eventsData, setEventsData] = useState<EventsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch domain data first
        const domainResponse = await fetch('/api/dashboard/domain')
        if (!domainResponse.ok) {
          const errorData = await domainResponse.json()
          throw new Error(errorData.message || 'Failed to fetch domain data')
        }
        const domainResult = await domainResponse.json()
        setDomainData(domainResult)

        // Fetch email statistics
        const statsResponse = await fetch('/api/dashboard/stats')
        if (!statsResponse.ok) {
          const errorData = await statsResponse.json()
          throw new Error(errorData.message || 'Failed to fetch email statistics')
        }
        const statsResult = await statsResponse.json()
        setEmailStats(statsResult.stats)

        // Fetch audience data
        const audienceResponse = await fetch('/api/dashboard/audience')
        if (!audienceResponse.ok) {
          const errorData = await audienceResponse.json()
          throw new Error(errorData.message || 'Failed to fetch audience data')
        }
        const audienceResult = await audienceResponse.json()
        setAudienceData(audienceResult)

        // Fetch events data
        const eventsResponse = await fetch('/api/dashboard/events')
        if (!eventsResponse.ok) {
          const errorData = await eventsResponse.json()
          throw new Error(errorData.message || 'Failed to fetch events data')
        }
        const eventsResult = await eventsResponse.json()
        setEventsData(eventsResult)

      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <SidebarProvider>
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard data...</p>
          </div>
        </div>
      </SidebarProvider>
    )
  }

  if (error) {
    return (
      <SidebarProvider>
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">No Data Available</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </SidebarProvider>
    )
  }

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

  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <div className="flex items-center gap-2">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <Mail className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">EmailIt</span>
                    <span className="text-xs text-muted-foreground">Dashboard</span>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        
        <SidebarContent>
          {navigation.map((section) => (
            <SidebarGroup key={section.title}>
              <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <a href={item.url} className="flex items-center gap-2">
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gray-200">
                      <span className="text-sm font-medium">
                        {domainData?.userEmail?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-medium">
                        {domainData?.userEmail?.split('@')[0] || 'User'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {domainData?.userEmail || 'user@domain.com'}
                      </span>
                    </div>
                    <ChevronDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                  <DropdownMenuItem>
                    <Settings className="mr-2 size-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="mr-2 size-4" />
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      
      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center gap-2 flex-1">
            <h1 className="font-semibold">
              Dashboard - {domainData?.userDomain || 'Domain'}
            </h1>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-8 w-48 lg:w-64" />
              </div>
              <Button variant="outline" size="icon">
                <Bell className="size-4" />
              </Button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 space-y-6 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Email Summary Stats */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {emailStatCards.map((stat) => (
                  <Card key={stat.title} className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                      <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`size-4 ${stat.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      {stat.change && (
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center">
                            {stat.trend === "up" ? (
                              <TrendingUp className="size-4 text-green-500 mr-1" />
                            ) : (
                              <TrendingDown className="size-4 text-red-500 mr-1" />
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
                ))}
              </div>

              {/* Delivery Rate Progress */}
              {emailStats && (
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Performance</CardTitle>
                    <CardDescription>Email delivery success rate for {domainData?.userDomain}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Delivery Rate</span>
                      <span className="text-sm text-muted-foreground">{emailStats.deliveryRate}%</span>
                    </div>
                    <Progress value={emailStats.deliveryRate} className="h-2" />
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{emailStats.delivered.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Delivered</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{emailStats.failed.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Failed</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Email Volume Chart */}
              {eventsData?.charts?.volume && (
                <Card>
                  <CardHeader>
                    <CardTitle>Email Volume Over Time</CardTitle>
                    <CardDescription>Track your email sending trends and delivery rates for {domainData?.userDomain}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        total: { label: "Total", color: "#3b82f6" },
                        delivered: { label: "Delivered", color: "#10b981" },
                        failed: { label: "Failed", color: "#ef4444" }
                      }}
                      className="h-80"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={eventsData.charts.volume} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="total" fill="#3b82f6" name="Total" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="delivered" fill="#10b981" name="Delivered" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="failed" fill="#ef4444" name="Failed" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}

              {/* Engagement Chart */}
              {eventsData?.charts?.engagement && (
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Engagement</CardTitle>
                    <CardDescription>Opens and clicks by day of the week for {domainData?.userDomain}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        opens: { label: "Opens", color: "#8b5cf6" },
                        clicks: { label: "Clicks", color: "#f59e0b" }
                      }}
                      className="h-80"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={eventsData.charts.engagement} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="day_name" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line type="monotone" dataKey="opens" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                          <Line type="monotone" dataKey="clicks" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="audience" className="space-y-6">
              {/* Domain Distribution & Overview */}
              <div className="grid gap-6 md:grid-cols-2">
                {audienceData?.domainDistribution && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Recipient Domains</CardTitle>
                      <CardDescription>Distribution of recipient email domains</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {audienceData.domainDistribution.slice(0, 5).map((domain: DomainDistribution) => (
                          <div key={domain.recipient_domain} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{domain.recipient_domain}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground w-12">{domain.unique_recipients}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {audienceData?.overview && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Audience Overview</CardTitle>
                      <CardDescription>Quick stats about your email recipients</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Total Recipients</span>
                        <span className="text-2xl font-bold">{audienceData.overview.totalRecipients.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Active</span>
                        <span className="text-lg font-semibold text-green-600">{audienceData.overview.activeRecipients.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Inactive</span>
                        <span className="text-lg font-semibold text-yellow-600">{audienceData.overview.inactiveRecipients.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Bounced</span>
                        <span className="text-lg font-semibold text-red-600">{audienceData.overview.bouncedRecipients.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Audience List */}
              {audienceData?.audience && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Recipients</CardTitle>
                    <CardDescription>List of email addresses from recent campaigns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {audienceData.audience.slice(0, 10).map((recipient: Recipient) => (
                        <div key={recipient.email} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-blue-100">
                              <UserCheck className="size-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium">{recipient.email}</div>
                              <div className="text-sm text-muted-foreground">{recipient.recipient_domain}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-sm font-medium">{recipient.total_emails}</div>
                              <div className="text-xs text-muted-foreground">emails</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-medium">
                                {new Date(recipient.last_seen).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-muted-foreground">last seen</div>
                            </div>
                            <Badge 
                              variant={
                                recipient.status === 'active' ? 'default' : 
                                recipient.status === 'inactive' ? 'secondary' : 
                                'destructive'
                              }
                            >
                              {recipient.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
