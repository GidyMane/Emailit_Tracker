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
    <ChartContainer
      config={{
        sent: { label: "Sent", color: "#3b82f6" },
        opened: { label: "Opened", color: "#10b981" },
        clicked: { label: "Clicked", color: "#f59e0b" }
      }}
      className="h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={emailVolumeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="sent" fill="#3b82f6" name="Sent" radius={[4, 4, 0, 0]} />
          <Bar dataKey="opened" fill="#10b981" name="Opened" radius={[4, 4, 0, 0]} />
          <Bar dataKey="clicked" fill="#f59e0b" name="Clicked" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
