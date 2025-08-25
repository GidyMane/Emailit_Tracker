"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartTooltip } from "@/components/ui/chart"
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts"
import { Eye, MousePointer, CheckCircle, XCircle, AlertCircle, Mail } from 'lucide-react'

interface AnalyticsSummaryProps {
  stats: {
    totalSent: number;
    delivered: number;
    failed: number;
    opens: number;
    clicks: number;
    openRate: number;
    clickRate: number;
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
  } | null;
  className?: string;
}

// Chart colors
const COLORS = {
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  purple: '#8b5cf6',
  gray: '#6b7280',
  teal: '#14b8a6',
  orange: '#f97316'
}

export function AnalyticsSummary({ stats, className }: AnalyticsSummaryProps) {
  if (!stats) {
    return (
      <div className={`grid gap-4 md:grid-cols-2 ${className}`}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Delivery Status</CardTitle>
            <CardDescription>Email delivery breakdown</CardDescription>
          </CardHeader>
          <CardContent className="h-48 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">No data available</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Engagement</CardTitle>
            <CardDescription>Opens and clicks overview</CardDescription>
          </CardHeader>
          <CardContent className="h-48 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">No data available</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Prepare delivery status data
  const deliveryData = stats.detailedStatus ? [
    { name: 'Delivered', value: stats.detailedStatus.sent, color: COLORS.success, icon: CheckCircle },
    { name: 'Hard Fail', value: stats.detailedStatus.hardfail, color: COLORS.danger, icon: XCircle },
    { name: 'Soft Fail', value: stats.detailedStatus.softfail, color: COLORS.warning, icon: AlertCircle },
    { name: 'Bounced', value: stats.detailedStatus.bounce, color: COLORS.purple, icon: Mail },
    { name: 'Errors', value: stats.detailedStatus.error, color: COLORS.gray, icon: XCircle }
  ].filter(item => item.value > 0) : []

  // Prepare engagement data
  const engagementData = [
    { name: 'Opened', value: stats.opens, color: COLORS.purple, icon: Eye },
    { name: 'Clicked', value: stats.clicks, color: COLORS.warning, icon: MousePointer },
    { name: 'Not Opened', value: Math.max(0, stats.totalSent - stats.opens), color: COLORS.gray, icon: Mail }
  ].filter(item => item.value > 0)

  interface PieLabelProps {
    percent: number;
  }

  const renderLabel = ({ percent }: PieLabelProps) => {
    if (percent < 0.05) return null;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className={`grid gap-4 lg:grid-cols-2 ${className}`}>
      {/* Delivery Status Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Delivery Status</CardTitle>
          <CardDescription>Breakdown of email delivery outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          {deliveryData.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deliveryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderLabel}
                      outerRadius="80%"
                      innerRadius="40%"
                      fill="#8884d8"
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={2}
                    >
                      {deliveryData.map((entry, index) => (
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
                                {((data.value / stats.totalSent) * 100).toFixed(1)}% of total
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Status Breakdown</h4>
                {deliveryData.map((item, index) => {
                  const Icon = item.icon;
                  const percentage = ((item.value / stats.totalSent) * 100).toFixed(1);
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
          ) : (
            <div className="h-48 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">No delivery data available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Engagement Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Email Engagement</CardTitle>
          <CardDescription>Opens and clicks overview</CardDescription>
        </CardHeader>
        <CardContent>
          {engagementData.length > 0 ? (
            <div className="space-y-4">
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={engagementData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderLabel}
                      outerRadius="80%"
                      innerRadius="40%"
                      fill="#8884d8"
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={2}
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
                                {((data.value / stats.totalSent) * 100).toFixed(1)}% of total
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Engagement Metrics */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-lg bg-purple-50">
                  <div className="text-lg font-bold text-purple-600">{stats.openRate.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Open Rate</div>
                </div>
                <div className="p-3 rounded-lg bg-orange-50">
                  <div className="text-lg font-bold text-orange-600">{stats.clickRate.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Click Rate</div>
                </div>
                <div className="p-3 rounded-lg bg-green-50">
                  <div className="text-lg font-bold text-green-600">{stats.deliveryRate.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Delivery Rate</div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-2">
                {engagementData.slice(0, 2).map((item, index) => {
                  const Icon = item.icon;
                  const percentage = ((item.value / stats.totalSent) * 100).toFixed(1);
                  return (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-2">
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
          ) : (
            <div className="h-48 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">No engagement data available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
