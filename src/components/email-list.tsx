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
import { MoreHorizontal, Eye, Edit, Copy, Trash2, Calendar, Users, TrendingUp } from 'lucide-react'
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
            <CardTitle>Email Campaigns</CardTitle>
            <CardDescription>
              Manage and monitor your email campaigns
            </CardDescription>
          </div>
          <Button>Create Campaign</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Recipients</TableHead>
                <TableHead className="hidden lg:table-cell">Open Rate</TableHead>
                <TableHead className="hidden lg:table-cell">Click Rate</TableHead>
                <TableHead className="hidden xl:table-cell">Revenue</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {campaign.subject}
                      </div>
                      {/* Show mobile-only info */}
                      <div className="sm:hidden text-xs text-muted-foreground space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusColor(campaign.status)} className="text-xs">
                            {getStatusIcon(campaign.status)} {campaign.status}
                          </Badge>
                          {campaign.sentDate && (
                            <span>{new Date(campaign.sentDate).toLocaleDateString()}</span>
                          )}
                        </div>
                        <div>
                          {campaign.recipients.toLocaleString()} recipients
                          {campaign.openRate > 0 && ` • ${campaign.openRate}% open rate`}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant={getStatusColor(campaign.status)}>
                      {getStatusIcon(campaign.status)} {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <Users className="size-4 text-muted-foreground" />
                      {campaign.recipients.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {campaign.openRate > 0 ? (
                      <div className="flex items-center gap-1">
                        <Eye className="size-4 text-muted-foreground" />
                        {campaign.openRate}%
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {campaign.clickRate > 0 ? (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="size-4 text-muted-foreground" />
                        {campaign.clickRate}%
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <span className="font-medium">{campaign.revenue}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {campaign.sentDate ? (
                      <div className="flex items-center gap-1">
                        <Calendar className="size-4 text-muted-foreground" />
                        {new Date(campaign.sentDate).toLocaleDateString()}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 size-4" />
                          View Details
                        </DropdownMenuItem>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
