"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

const emailVolumeData = [
  { month: "Jan", sent: 12000, opened: 8400, clicked: 2100 },
  { month: "Feb", sent: 15000, opened: 10500, clicked: 2625 },
  { month: "Mar", sent: 18000, opened: 12600, clicked: 3150 },
  { month: "Apr", sent: 22000, opened: 15400, clicked: 3850 },
  { month: "May", sent: 25000, opened: 17500, clicked: 4375 },
  { month: "Jun", sent: 24567, opened: 16757, clicked: 4194 }
]

const engagementData = [
  { day: "Mon", opens: 1200, clicks: 300 },
  { day: "Tue", opens: 1800, clicks: 450 },
  { day: "Wed", opens: 2200, clicks: 550 },
  { day: "Thu", opens: 2800, clicks: 700 },
  { day: "Fri", opens: 3200, clicks: 800 },
  { day: "Sat", opens: 1600, clicks: 400 },
  { day: "Sun", opens: 1000, clicks: 250 }
]

const deviceData = [
  { name: "Desktop", value: 45, color: "#3b82f6" },
  { name: "Mobile", value: 40, color: "#10b981" },
  { name: "Tablet", value: 15, color: "#f59e0b" }
]

const campaignTypeData = [
  { type: "Newsletter", count: 45, percentage: 35 },
  { type: "Promotional", count: 38, percentage: 30 },
  { type: "Transactional", count: 25, percentage: 20 },
  { type: "Welcome", count: 19, percentage: 15 }
]

export function EmailCharts() {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      {/* Email Volume Trend */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Email Volume Trend</CardTitle>
          <CardDescription>
            Monthly email sending, opens, and clicks over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              sent: { label: "Sent", color: "#3b82f6" },
              opened: { label: "Opened", color: "#10b981" },
              clicked: { label: "Clicked", color: "#f59e0b" }
            }}
            className="h-64 sm:h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emailVolumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sent" fill="#3b82f6" name="Sent" />
                <Bar dataKey="opened" fill="#10b981" name="Opened" />
                <Bar dataKey="clicked" fill="#f59e0b" name="Clicked" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Weekly Engagement */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Engagement</CardTitle>
          <CardDescription>
            Opens and clicks by day of the week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              opens: { label: "Opens", color: "#3b82f6" },
              clicks: { label: "Clicks", color: "#10b981" }
            }}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="opens" stroke="#3b82f6" strokeWidth={2} name="Opens" />
                <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} name="Clicks" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Device Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Device Breakdown</CardTitle>
          <CardDescription>
            Email opens by device type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              desktop: { label: "Desktop", color: "#3b82f6" },
              mobile: { label: "Mobile", color: "#10b981" },
              tablet: { label: "Tablet", color: "#f59e0b" }
            }}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="flex justify-center gap-4 mt-4">
            {deviceData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Campaign Types */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Campaign Types Distribution</CardTitle>
          <CardDescription>
            Breakdown of campaigns by type this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaignTypeData.map((item) => (
              <div key={item.type} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded" />
                  <span className="font-medium">{item.type}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{item.count} campaigns</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-8">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
