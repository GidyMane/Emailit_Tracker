"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { BarChart3, TrendingUp, PieChart, Mail, Clock, CheckCircle, XCircle, AlertCircle, Eye, MousePointer, Send, Zap } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, Pie, PieChart as RechartsPieChart, Cell, Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

interface EventsData {
  charts: ChartData;
  domainName: string;
  isAdmin: boolean;
}

interface DomainData {
  userDomain: string;
}

interface AnalyticsData {
  stats: EmailStats;
  events: EventsData;
  domain: DomainData;
}

// Color scheme for charts
const CHART_COLORS = {
  primary: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  purple: '#8b5cf6',
  pink: '#ec4899',
  teal: '#14b8a6',
  orange: '#f97316',
  gray: '#6b7280',
  indigo: '#6366f1'
}

// Pie chart colors for different status types
const PIE_COLORS = [
  CHART_COLORS.success,
  CHART_COLORS.danger,
  CHART_COLORS.warning,
  CHART_COLORS.purple,
  CHART_COLORS.gray,
  CHART_COLORS.teal,
  CHART_COLORS.orange
]

export function EnhancedAnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeChartTab, setActiveChartTab] = useState("overview")

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch all required data concurrently
        const [domainResponse, statsResponse, eventsResponse] = await Promise.all([
          fetch('/api/dashboard/domain'),
          fetch('/api/dashboard/stats'),
          fetch('/api/dashboard/events')
        ])

        if (!domainResponse.ok || !statsResponse.ok || !eventsResponse.ok) {
          throw new Error('Failed to fetch analytics data')
        }

        const [domainData, statsData, eventsData] = await Promise.all([
          domainResponse.json(),
          statsResponse.json(),
          eventsResponse.json()
        ])

        setAnalyticsData({
          stats: statsData.stats,
          events: eventsData,
          domain: domainData
        })

      } catch (err) {
        console.error('Error fetching analytics data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load analytics data')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [])

  // Prepare pie chart data for delivery status
  const getDeliveryStatusPieData = () => {
    if (!analyticsData?.stats.detailedStatus) return []
    
    const { detailedStatus } = analyticsData.stats
    return [
      { name: 'Successfully Sent', value: detailedStatus.sent, color: CHART_COLORS.success, icon: CheckCircle },
      { name: 'Hard Failures', value: detailedStatus.hardfail, color: CHART_COLORS.danger, icon: XCircle },
      { name: 'Soft Failures', value: detailedStatus.softfail, color: CHART_COLORS.warning, icon: AlertCircle },
      { name: 'Bounced', value: detailedStatus.bounce, color: CHART_COLORS.purple, icon: Mail },
      { name: 'System Errors', value: detailedStatus.error, color: CHART_COLORS.gray, icon: XCircle },
      { name: 'Held', value: detailedStatus.held, color: CHART_COLORS.teal, icon: Clock },
      { name: 'Delayed', value: detailedStatus.delayed, color: CHART_COLORS.orange, icon: Clock }
    ].filter(item => item.value > 0)
  }

  // Prepare pie chart data for engagement
  const getEngagementPieData = () => {
    if (!analyticsData?.stats) return []
    
    const { totalSent, opens, clicks } = analyticsData.stats
    const unopened = Math.max(0, totalSent - opens)
    
    return [
      { name: 'Emails Opened', value: opens, color: CHART_COLORS.primary, icon: Eye },
      { name: 'Links Clicked', value: clicks, color: CHART_COLORS.purple, icon: MousePointer },
      { name: 'Not Opened', value: unopened, color: CHART_COLORS.gray, icon: Mail }
    ].filter(item => item.value > 0)
  }

  // Custom label component for pie charts
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null; // Don't show label for very small slices

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const EmptyChart = ({ title, description }: { title: string, description: string }) => (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-64 sm:h-80 flex items-center justify-center">
        <div className="text-center space-y-2">
          <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
          <p className="text-sm text-muted-foreground">No data available yet</p>
        </div>
      </CardContent>
    </Card>
  )

  const ChartSkeleton = () => (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="h-64 sm:h-80">
        <div className="w-full h-full flex items-end justify-around space-x-2 pb-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className={`w-12 h-${Math.floor(Math.random() * 32) + 16}`} />
          ))}
        </div>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        
        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="text-center space-y-4 py-12">
          <TrendingUp className="h-16 w-16 text-red-500 mx-auto" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Failed to Load Analytics</h2>
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

  const deliveryStatusData = getDeliveryStatusPieData()
  const engagementData = getEngagementPieData()
  const stats = analyticsData?.stats
  const events = analyticsData?.events
  const domain = analyticsData?.domain

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive email delivery analytics and performance insights for {domain?.userDomain || 'your domain'}
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sent</CardTitle>
            <div className="p-2 rounded-lg bg-blue-100">
              <Send className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{stats?.totalSent.toLocaleString() || '0'}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.recentActivity.emailsLast7Days || 0} in last 7 days
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Delivery Rate</CardTitle>
            <div className="p-2 rounded-lg bg-green-100">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{stats?.deliveryRate.toFixed(1) || '0.0'}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.delivered.toLocaleString() || 0} delivered
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Rate</CardTitle>
            <div className="p-2 rounded-lg bg-purple-100">
              <Eye className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{stats?.openRate.toFixed(1) || '0.0'}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.opens.toLocaleString() || 0} opens
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Click Rate</CardTitle>
            <div className="p-2 rounded-lg bg-orange-100">
              <MousePointer className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{stats?.clickRate.toFixed(1) || '0.0'}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.clicks.toLocaleString() || 0} clicks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Tabs */}
      <Tabs value={activeChartTab} onValueChange={setActiveChartTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Status</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Email Volume Chart */}
          {events?.charts?.volume && Array.isArray(events.charts.volume) && events.charts.volume.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Email Volume Trends</CardTitle>
                <CardDescription>Daily email volume and delivery performance over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    total: { label: "Total", color: CHART_COLORS.primary },
                    delivered: { label: "Delivered", color: CHART_COLORS.success },
                    failed: { label: "Failed", color: CHART_COLORS.danger },
                    opens: { label: "Opens", color: CHART_COLORS.purple },
                    clicks: { label: "Clicks", color: CHART_COLORS.warning }
                  }}
                  className="h-64 sm:h-96"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={events.charts.volume} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis 
                        dataKey="date" 
                        fontSize={12}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis fontSize={12} />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                        labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="total" stackId="1" stroke={CHART_COLORS.primary} fill={CHART_COLORS.primary} fillOpacity={0.3} />
                      <Area type="monotone" dataKey="delivered" stackId="2" stroke={CHART_COLORS.success} fill={CHART_COLORS.success} fillOpacity={0.6} />
                      <Area type="monotone" dataKey="failed" stackId="2" stroke={CHART_COLORS.danger} fill={CHART_COLORS.danger} fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          ) : (
            <EmptyChart
              title="Email Volume Trends"
              description="Daily email volume and delivery performance will appear here"
            />
          )}

          {/* Engagement Line Chart */}
          {events?.charts?.engagement && Array.isArray(events.charts.engagement) && events.charts.engagement.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Weekly Engagement Patterns</CardTitle>
                <CardDescription>Opens and clicks by day of the week</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    opens: { label: "Opens", color: CHART_COLORS.purple },
                    clicks: { label: "Clicks", color: CHART_COLORS.warning }
                  }}
                  className="h-64 sm:h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={events.charts.engagement} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis 
                        dataKey="day_name" 
                        fontSize={12}
                        tickFormatter={(value) => value.trim().substring(0, 3)}
                      />
                      <YAxis fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="opens" 
                        stroke={CHART_COLORS.purple} 
                        strokeWidth={3} 
                        dot={{ r: 6, fill: CHART_COLORS.purple }} 
                        activeDot={{ r: 8, fill: CHART_COLORS.purple }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="clicks" 
                        stroke={CHART_COLORS.warning} 
                        strokeWidth={3} 
                        dot={{ r: 6, fill: CHART_COLORS.warning }}
                        activeDot={{ r: 8, fill: CHART_COLORS.warning }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          ) : (
            <EmptyChart
              title="Weekly Engagement Patterns"
              description="Opens and clicks by day of the week will appear here"
            />
          )}
        </TabsContent>

        <TabsContent value="delivery" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Delivery Status Pie Chart */}
            {deliveryStatusData.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Status Distribution</CardTitle>
                  <CardDescription>Breakdown of email delivery outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="h-64 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={deliveryStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {deliveryStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip 
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-white p-3 border rounded shadow-lg">
                                    <div className="flex items-center gap-2 mb-1">
                                      <div 
                                        className="w-3 h-3 rounded" 
                                        style={{ backgroundColor: data.color }}
                                      />
                                      <span className="font-medium">{data.name}</span>
                                    </div>
                                    <p className="text-lg font-bold">{data.value.toLocaleString()}</p>
                                    <p className="text-sm text-gray-600">
                                      {((data.value / stats!.totalSent) * 100).toFixed(1)}% of total
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {/* Legend */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">Status Breakdown</h4>
                      {deliveryStatusData.map((item, index) => {
                        const Icon = item.icon;
                        const percentage = ((item.value / stats!.totalSent) * 100).toFixed(1);
                        return (
                          <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded" 
                                style={{ backgroundColor: item.color }}
                              />
                              <Icon className="h-4 w-4" style={{ color: item.color }} />
                              <span className="text-sm font-medium">{item.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold">{item.value.toLocaleString()}</div>
                              <div className="text-xs text-muted-foreground">{percentage}%</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <EmptyChart
                title="Delivery Status Distribution"
                description="Delivery status breakdown will appear here"
              />
            )}

            {/* Detailed Status Bar Chart */}
            {deliveryStatusData.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Performance</CardTitle>
                  <CardDescription>Detailed breakdown of delivery outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: { label: "Count", color: CHART_COLORS.primary }
                    }}
                    className="h-64 sm:h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={deliveryStatusData} 
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                        layout="horizontal"
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis type="number" fontSize={12} />
                        <YAxis 
                          type="category" 
                          dataKey="name" 
                          fontSize={12}
                          width={100}
                          tickFormatter={(value) => value.length > 12 ? value.substring(0, 12) + '...' : value}
                        />
                        <ChartTooltip 
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-3 border rounded shadow-lg">
                                  <p className="font-medium">{label}</p>
                                  <p className="text-lg font-bold">{data.value.toLocaleString()}</p>
                                  <p className="text-sm text-gray-600">
                                    {((data.value / stats!.totalSent) * 100).toFixed(1)}% of total
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                          {deliveryStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            ) : (
              <EmptyChart
                title="Delivery Performance"
                description="Detailed delivery performance metrics will appear here"
              />
            )}
          </div>

          {/* Delivery Metrics Cards */}
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600">{stats?.deliveryRate.toFixed(1) || '0.0'}%</div>
                <p className="text-sm text-muted-foreground">Delivery Rate</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-red-600">
                  {stats ? ((stats.failed / stats.totalSent) * 100).toFixed(1) : '0.0'}%
                </div>
                <p className="text-sm text-muted-foreground">Failure Rate</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-yellow-600">
                  {stats ? (((stats.detailedStatus.bounce + stats.detailedStatus.softfail) / stats.totalSent) * 100).toFixed(1) : '0.0'}%
                </div>
                <p className="text-sm text-muted-foreground">Bounce Rate</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600">
                  {stats ? (((stats.detailedStatus.held + stats.detailedStatus.delayed) / stats.totalSent) * 100).toFixed(1) : '0.0'}%
                </div>
                <p className="text-sm text-muted-foreground">Pending Rate</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Engagement Pie Chart */}
            {engagementData.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Email Engagement</CardTitle>
                  <CardDescription>Opens vs clicks vs unopened emails</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="h-64 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={engagementData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {engagementData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip 
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-white p-3 border rounded shadow-lg">
                                    <div className="flex items-center gap-2 mb-1">
                                      <div 
                                        className="w-3 h-3 rounded" 
                                        style={{ backgroundColor: data.color }}
                                      />
                                      <span className="font-medium">{data.name}</span>
                                    </div>
                                    <p className="text-lg font-bold">{data.value.toLocaleString()}</p>
                                    <p className="text-sm text-gray-600">
                                      {((data.value / stats!.totalSent) * 100).toFixed(1)}% of total
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {/* Legend */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">Engagement Breakdown</h4>
                      {engagementData.map((item, index) => {
                        const Icon = item.icon;
                        const percentage = ((item.value / stats!.totalSent) * 100).toFixed(1);
                        return (
                          <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded" 
                                style={{ backgroundColor: item.color }}
                              />
                              <Icon className="h-4 w-4" style={{ color: item.color }} />
                              <span className="text-sm font-medium">{item.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold">{item.value.toLocaleString()}</div>
                              <div className="text-xs text-muted-foreground">{percentage}%</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <EmptyChart
                title="Email Engagement"
                description="Engagement statistics will appear here"
              />
            )}

            {/* Engagement Time Series */}
            {events?.charts?.volume && events.charts.volume.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Over Time</CardTitle>
                  <CardDescription>Opens and clicks trend over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      opens: { label: "Opens", color: CHART_COLORS.purple },
                      clicks: { label: "Clicks", color: CHART_COLORS.warning }
                    }}
                    className="h-64 sm:h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={events.charts.volume} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis 
                          dataKey="date" 
                          fontSize={12}
                          tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        />
                        <YAxis fontSize={12} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="opens" 
                          stackId="1" 
                          stroke={CHART_COLORS.purple} 
                          fill={CHART_COLORS.purple} 
                          fillOpacity={0.6} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="clicks" 
                          stackId="2" 
                          stroke={CHART_COLORS.warning} 
                          fill={CHART_COLORS.warning} 
                          fillOpacity={0.6} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            ) : (
              <EmptyChart
                title="Engagement Over Time"
                description="Engagement trends will appear here"
              />
            )}
          </div>

          {/* Engagement Metrics */}
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-purple-600">{stats?.openRate.toFixed(1) || '0.0'}%</div>
                <p className="text-sm text-muted-foreground">Email Open Rate</p>
                <p className="text-xs text-muted-foreground mt-1">{stats?.opens.toLocaleString() || 0} opens</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-orange-600">{stats?.clickRate.toFixed(1) || '0.0'}%</div>
                <p className="text-sm text-muted-foreground">Click Rate</p>
                <p className="text-xs text-muted-foreground mt-1">{stats?.clicks.toLocaleString() || 0} clicks</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-blue-600">{stats?.recipientOpenRate.toFixed(1) || '0.0'}%</div>
                <p className="text-sm text-muted-foreground">Unique Opens</p>
                <p className="text-xs text-muted-foreground mt-1">Per recipient</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-teal-600">{stats?.recipientClickRate.toFixed(1) || '0.0'}%</div>
                <p className="text-sm text-muted-foreground">Unique Clicks</p>
                <p className="text-xs text-muted-foreground mt-1">Per recipient</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Email engagement activity in recent periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Send className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{stats?.recentActivity.emailsLast7Days || 0}</div>
                    <div className="text-sm text-muted-foreground">Emails (7 days)</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
                  <div className="p-2 rounded-lg bg-green-100">
                    <Eye className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{stats?.recentActivity.opensLast7Days || 0}</div>
                    <div className="text-sm text-muted-foreground">Opens (7 days)</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <MousePointer className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{stats?.recentActivity.clicksLast7Days || 0}</div>
                    <div className="text-sm text-muted-foreground">Clicks (7 days)</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50">
                  <div className="p-2 rounded-lg bg-orange-100">
                    <Zap className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{stats?.recentActivity.emailsLast24Hours || 0}</div>
                    <div className="text-sm text-muted-foreground">Emails (24hrs)</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
