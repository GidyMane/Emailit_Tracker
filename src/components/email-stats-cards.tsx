"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Mail, MailOpen, MousePointer, TrendingUp, TrendingDown, Users, Send, AlertCircle } from 'lucide-react'

const stats = [
  {
    title: "Total Emails Sent",
    value: "24,567",
    change: "+12.5%",
    trend: "up",
    icon: Send,
    description: "This month",
    color: "text-blue-600"
  },
  {
    title: "Open Rate",
    value: "68.2%",
    change: "+2.1%",
    trend: "up",
    icon: MailOpen,
    description: "Average open rate",
    color: "text-green-600"
  },
  {
    title: "Click Rate",
    value: "24.8%",
    change: "-1.2%",
    trend: "down",
    icon: MousePointer,
    description: "Click-through rate",
    color: "text-orange-600"
  },
  {
    title: "Subscribers",
    value: "8,429",
    change: "+5.7%",
    trend: "up",
    icon: Users,
    description: "Active subscribers",
    color: "text-purple-600"
  }
]

const campaignStats = [
  {
    name: "Welcome Series",
    sent: 1250,
    opened: 892,
    clicked: 234,
    openRate: 71.4,
    status: "active"
  },
  {
    name: "Product Launch",
    sent: 3420,
    opened: 2105,
    clicked: 567,
    openRate: 61.5,
    status: "completed"
  },
  {
    name: "Newsletter #47",
    sent: 5680,
    opened: 3890,
    clicked: 1023,
    openRate: 68.5,
    status: "active"
  }
]

export function EmailStatsCards() {
  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`size-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{stat.description}</span>
                <div className="flex items-center">
                  {stat.trend === "up" ? (
                    <TrendingUp className="size-3 text-green-500" />
                  ) : (
                    <TrendingDown className="size-3 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaign Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Campaign Performance</CardTitle>
          <CardDescription>
            Overview of your latest email campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaignStats.map((campaign) => (
              <div key={campaign.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{campaign.name}</h4>
                    <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {campaign.sent.toLocaleString()} sent • {campaign.opened.toLocaleString()} opened • {campaign.clicked.toLocaleString()} clicked
                  </div>
                </div>
                <div className="text-left sm:text-right space-y-1">
                  <div className="text-sm font-medium">{campaign.openRate}% open rate</div>
                  <Progress value={campaign.openRate} className="w-full sm:w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
