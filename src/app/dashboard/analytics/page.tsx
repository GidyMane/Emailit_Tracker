"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { BarChart3, TrendingUp } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
}

interface DomainData {
  userDomain: string;
}

interface EmailStats {
  totalSent: number;
  delivered: number;
  failed: number;
  opens: number;
  clicks: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
}

// Define proper types for pie chart label props
interface PieLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  value: number;
}

// Chart colors
const CHART_COLORS = {
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  purple: '#8b5cf6',
  blue: '#3b82f6',
  gray: '#6b7280'
}

export default function AnalyticsPage() {
  const [eventsData, setEventsData] = useState<EventsData | null>(null)
  const [domainData, setDomainData] = useState<DomainData | null>(null)
  const [statsData, setStatsData] = useState<EmailStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  // Custom label renderer for pie charts
  const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelProps) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    if (percent < 0.05) return null // Don't show label for very small slices

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
        className="drop-shadow-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

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

        // Fetch events data for charts
        const eventsResponse = await fetch('/api/dashboard/events')
        if (!eventsResponse.ok) {
          throw new Error('Failed to fetch analytics data')
        }
        const eventsResult = await eventsResponse.json()
        setEventsData(eventsResult)

        // Fetch stats data for pie charts
        const statsResponse = await fetch('/api/dashboard/stats')
        if (statsResponse.ok) {
          const statsResult = await statsResponse.json()
          setStatsData(statsResult.stats)
        }

      } catch (err) {
        console.error('Error fetching analytics data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load analytics data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const EmptyChart = ({ title, description }: { title: string, description: string }) => (
    <Card>
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
    <Card>
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
        <ChartSkeleton />
        <ChartSkeleton />
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

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Detailed analytics and performance metrics for {domainData?.userDomain || 'your domain'}
        </p>
      </div>

      {/* Email Volume Chart */}
      {eventsData?.charts?.volume && Array.isArray(eventsData.charts.volume) && eventsData.charts.volume.length > 0 ? (
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
              className="h-64 sm:h-80"
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
      ) : (
        <EmptyChart
          title="Email Volume Over Time"
          description={`Track your email sending trends and delivery rates for ${domainData?.userDomain || 'your domain'}`}
        />
      )}

      {/* Engagement Chart */}
      {eventsData?.charts?.engagement && Array.isArray(eventsData.charts.engagement) && eventsData.charts.engagement.length > 0 ? (
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
              className="h-64 sm:h-80"
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
      ) : (
        <EmptyChart
          title="Weekly Engagement"
          description={`Opens and clicks by day of the week for ${domainData?.userDomain || 'your domain'}`}
        />
      )}

      {/* Pie Chart Analytics */}
      {statsData && (
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          {/* Delivery Status Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Status Distribution</CardTitle>
              <CardDescription>Visual breakdown of email delivery outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Delivered', value: statsData.delivered, color: CHART_COLORS.success },
                        { name: 'Failed', value: statsData.failed, color: CHART_COLORS.danger }
                      ].filter(item => item.value > 0)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderPieLabel}
                      outerRadius="80%"
                      innerRadius="40%"
                      fill="#8884d8"
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={2}
                    >
                      {[{ color: CHART_COLORS.success }, { color: CHART_COLORS.danger }].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
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
                                {((data.value / statsData.totalSent) * 100).toFixed(1)}% of total
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Delivery Legend */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-green-500" />
                    <span className="text-sm font-medium">Delivered</span>
                  </div>
                  <span className="text-sm font-bold">{statsData.delivered.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-red-500" />
                    <span className="text-sm font-medium">Failed</span>
                  </div>
                  <span className="text-sm font-bold">{statsData.failed.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Engagement Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Email Engagement</CardTitle>
              <CardDescription>Opens vs clicks vs unopened emails</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Opened', value: statsData.opens, color: CHART_COLORS.purple },
                        { name: 'Clicked', value: statsData.clicks, color: CHART_COLORS.warning },
                        { name: 'Not Opened', value: Math.max(0, statsData.totalSent - statsData.opens), color: CHART_COLORS.gray }
                      ].filter(item => item.value > 0)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderPieLabel}
                      outerRadius="80%"
                      innerRadius="40%"
                      fill="#8884d8"
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={2}
                    >
                      {[{ color: CHART_COLORS.purple }, { color: CHART_COLORS.warning }, { color: CHART_COLORS.gray }].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
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
                                {((data.value / statsData.totalSent) * 100).toFixed(1)}% of total
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Engagement Metrics */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-purple-50 rounded">
                  <div className="text-sm font-bold text-purple-600">{statsData.openRate.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Open Rate</div>
                </div>
                <div className="p-2 bg-orange-50 rounded">
                  <div className="text-sm font-bold text-orange-600">{statsData.clickRate.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Click Rate</div>
                </div>
                <div className="p-2 bg-blue-50 rounded">
                  <div className="text-sm font-bold text-blue-600">
                    {statsData.opens > 0 ? ((statsData.clicks / statsData.opens) * 100).toFixed(1) : 0}%
                  </div>
                  <div className="text-xs text-muted-foreground">Click-to-Open</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Additional Analytics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {eventsData?.charts?.volume ? 
                Math.round((eventsData.charts.volume.reduce((sum, day) => sum + day.opens, 0) / 
                           eventsData.charts.volume.reduce((sum, day) => sum + day.total, 0)) * 100) || 0 
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Based on recent data
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {eventsData?.charts?.volume ? 
                Math.round((eventsData.charts.volume.reduce((sum, day) => sum + day.clicks, 0) / 
                           eventsData.charts.volume.reduce((sum, day) => sum + day.total, 0)) * 100) || 0 
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Based on recent data
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Day</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {eventsData?.charts?.engagement && eventsData.charts.engagement.length > 0 ?
                eventsData.charts.engagement.reduce((max, day) => 
                  day.opens > max.opens ? day : max
                ).day_name || 'N/A'
                : 'N/A'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Highest engagement day
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {eventsData?.charts?.volume ? 
                Math.round((eventsData.charts.volume.reduce((sum, day) => sum + day.delivered, 0) / 
                           eventsData.charts.volume.reduce((sum, day) => sum + day.total, 0)) * 100) || 0 
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Based on recent data
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
