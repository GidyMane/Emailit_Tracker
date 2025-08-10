"use client"

import * as React from "react"
import { useState } from "react"
import { BarChart3, Bell, Calendar, ChevronDown, FileText, Home, Inbox, Mail, MailOpen, Search, Send, Settings, TrendingUp, TrendingDown, Users, Zap, UserCheck, XCircle, CheckCircle, Clock } from 'lucide-react'

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
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

const navigation = [
  {
    title: "Main Navigation",
    items: [
      { title: "Dashboard", icon: Home, url: "#", isActive: true },
      { title: "Campaigns", icon: Mail, url: "#", badge: "12" },
      { title: "Templates", icon: FileText, url: "#" },
      { title: "Audience", icon: Users, url: "#" },
      { title: "Analytics", icon: BarChart3, url: "#" },
    ]
  },
  {
    title: "Email Tools",
    items: [
      { title: "Inbox", icon: Inbox, url: "#", badge: "3" },
      { title: "Sent", icon: Send, url: "#" },
      { title: "Drafts", icon: FileText, url: "#" },
      { title: "Automation", icon: Zap, url: "#" },
    ]
  }
]

// Sample email statistics
const emailStats = [
  { title: "Total Sent", icon: Send, value: "24,567", change: "+12%", trend: "up", color: "text-blue-600", bgColor: "bg-blue-100" },
  { title: "Delivered", icon: CheckCircle, value: "23,890", change: "+10%", trend: "up", color: "text-green-600", bgColor: "bg-green-100" },
  { title: "Failed", icon: XCircle, value: "677", change: "-5%", trend: "down", color: "text-red-600", bgColor: "bg-red-100" },
  { title: "Opens", icon: MailOpen, value: "16,287", change: "+8%", trend: "up", color: "text-purple-600", bgColor: "bg-purple-100" },
  { title: "Clicks", icon: Zap, value: "4,194", change: "+3%", trend: "up", color: "text-orange-600", bgColor: "bg-orange-100" },
  { title: "Pending", icon: Clock, value: "156", change: "+2%", trend: "up", color: "text-yellow-600", bgColor: "bg-yellow-100" }
]

// Sample audience data (from email "to" fields)
const audienceData = [
  { email: "john@example.com", domain: "example.com", totalEmails: 45, lastSeen: "2024-01-15", status: "active" },
  { email: "sarah@company.org", domain: "company.org", totalEmails: 32, lastSeen: "2024-01-14", status: "active" },
  { email: "mike@business.net", domain: "business.net", totalEmails: 28, lastSeen: "2024-01-13", status: "inactive" },
  { email: "anna@startup.io", domain: "startup.io", totalEmails: 67, lastSeen: "2024-01-15", status: "active" },
  { email: "david@tech.com", domain: "tech.com", totalEmails: 89, lastSeen: "2024-01-12", status: "bounced" }
]

// Sample domain analytics
const domainStats = [
  { domain: "gmail.com", count: 1250, percentage: 35 },
  { domain: "outlook.com", count: 890, percentage: 25 },
  { domain: "yahoo.com", count: 534, percentage: 15 },
  { domain: "company.org", count: 356, percentage: 10 },
  { domain: "others", count: 534, percentage: 15 }
]

// Chart data
const emailVolumeData = [
  { month: "Jan", sent: 12000, delivered: 11400, failed: 600 },
  { month: "Feb", sent: 15000, delivered: 14250, failed: 750 },
  { month: "Mar", sent: 18000, delivered: 17100, failed: 900 },
  { month: "Apr", sent: 22000, delivered: 20900, failed: 1100 },
  { month: "May", sent: 25000, delivered: 23750, failed: 1250 },
  { month: "Jun", sent: 24567, delivered: 23890, failed: 677 }
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

export function EnhancedEmailDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

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
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto">
                              {item.badge}
                            </Badge>
                          )}
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
                      <span className="text-sm font-medium">JD</span>
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-medium">John Doe</span>
                      <span className="text-xs text-muted-foreground">john@emailit.com</span>
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
            <h1 className="font-semibold">Dashboard</h1>
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
                {emailStats.map((stat) => (
                  <Card key={stat.title} className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                      <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`size-4 ${stat.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
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
                        <span>vs last month</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Delivery Rate Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Performance</CardTitle>
                  <CardDescription>Email delivery success rate over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Delivery Rate</span>
                    <span className="text-sm text-muted-foreground">97.2%</span>
                  </div>
                  <Progress value={97.2} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">23,890</div>
                      <div className="text-sm text-muted-foreground">Delivered</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">677</div>
                      <div className="text-sm text-muted-foreground">Failed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Email Volume Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Email Volume Over Time</CardTitle>
                  <CardDescription>Track your email sending trends and delivery rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      sent: { label: "Sent", color: "#3b82f6" },
                      delivered: { label: "Delivered", color: "#10b981" },
                      failed: { label: "Failed", color: "#ef4444" }
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
                        <Bar dataKey="delivered" fill="#10b981" name="Delivered" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="failed" fill="#ef4444" name="Failed" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Engagement Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Engagement</CardTitle>
                  <CardDescription>Opens and clicks by day of the week</CardDescription>
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
                      <LineChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="opens" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="clicks" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audience" className="space-y-6">
              {/* Domain Distribution */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Domains</CardTitle>
                    <CardDescription>Distribution of recipient email domains</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {domainStats.map((domain, index) => (
                        <div key={domain.domain} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{domain.domain}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={domain.percentage} className="w-20 h-2" />
                            <span className="text-sm text-muted-foreground w-12">{domain.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Audience Overview</CardTitle>
                    <CardDescription>Quick stats about your email recipients</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Recipients</span>
                      <span className="text-2xl font-bold">3,564</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Active</span>
                      <span className="text-lg font-semibold text-green-600">2,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Inactive</span>
                      <span className="text-lg font-semibold text-yellow-600">534</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Bounced</span>
                      <span className="text-lg font-semibold text-red-600">183</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Audience List */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Recipients</CardTitle>
                  <CardDescription>List of email addresses from recent campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {audienceData.map((recipient, index) => (
                      <div key={recipient.email} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-blue-100">
                            <UserCheck className="size-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">{recipient.email}</div>
                            <div className="text-sm text-muted-foreground">{recipient.domain}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-sm font-medium">{recipient.totalEmails}</div>
                            <div className="text-xs text-muted-foreground">emails</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium">{recipient.lastSeen}</div>
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
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
