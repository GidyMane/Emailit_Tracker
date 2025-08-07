"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontal, Eye, Edit, Copy, Trash2, Calendar, Users, TrendingUp, Mail, ArrowRight } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const campaigns = [
  {
    id: 1,
    name: "Summer Sale 2024",
    subject: "🌞 Up to 50% Off Summer Collection",
    status: "sent",
    sentDate: "2024-01-15",
    recipients: 5420,
    openRate: 68.2,
    clickRate: 24.8,
    revenue: "$12,450"
  },
  {
    id: 2,
    name: "Welcome Series - Part 1",
    subject: "Welcome to EmailIt! Let's get started",
    status: "active",
    sentDate: "2024-01-14",
    recipients: 1250,
    openRate: 71.4,
    clickRate: 28.3,
    revenue: "$3,200"
  },
  {
    id: 3,
    name: "Product Launch Announcement",
    subject: "Introducing our latest innovation",
    status: "scheduled",
    sentDate: "2024-01-16",
    recipients: 8900,
    openRate: 0,
    clickRate: 0,
    revenue: "$0"
  },
  {
    id: 4,
    name: "Newsletter #47",
    subject: "Weekly insights and updates",
    status: "draft",
    sentDate: null,
    recipients: 0,
    openRate: 0,
    clickRate: 0,
    revenue: "$0"
  },
  {
    id: 5,
    name: "Abandoned Cart Recovery",
    subject: "Don't forget your items!",
    status: "sent",
    sentDate: "2024-01-13",
    recipients: 890,
    openRate: 45.2,
    clickRate: 18.7,
    revenue: "$2,890"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "sent":
      return "default"
    case "active":
      return "default"
    case "scheduled":
      return "secondary"
    case "draft":
      return "outline"
    default:
      return "secondary"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "sent":
      return "✓"
    case "active":
      return "●"
    case "scheduled":
      return "⏰"
    case "draft":
      return "📝"
    default:
      return "●"
  }
}

export function EmailList() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Campaigns</CardTitle>
            <CardDescription>
              Your latest email campaigns and their performance
            </CardDescription>
          </div>
          <Button>
            <Mail className="mr-2 size-4" />
            New Campaign
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {campaigns.slice(0, 5).map((campaign) => (
            <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-3">
                  <h4 className="font-medium">{campaign.name}</h4>
                  <Badge variant={getStatusColor(campaign.status)} className="text-xs">
                    {campaign.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {campaign.recipients.toLocaleString()} recipients
                  {campaign.openRate > 0 && ` • ${campaign.openRate}% opened`}
                  {campaign.sentDate && ` • ${new Date(campaign.sentDate).toLocaleDateString()}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="size-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 size-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 size-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline">
            View All Campaigns
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
