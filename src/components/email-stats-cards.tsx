"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Mail, MailOpen, MousePointer, TrendingUp, TrendingDown, Users, Send, AlertCircle } from 'lucide-react'

const stats = [
  {
    title: "Emails Sent",
    value: "24,567",
    change: "+12.5%",
    trend: "up",
    icon: Send,
    color: "text-blue-600"
  },
  {
    title: "Open Rate",
    value: "68.2%",
    change: "+2.1%",
    trend: "up",
    icon: MailOpen,
    color: "text-green-600"
  },
  {
    title: "Click Rate",
    value: "24.8%",
    change: "-1.2%",
    trend: "down",
    icon: MousePointer,
    color: "text-orange-600"
  },
  {
    title: "Subscribers",
    value: "8,429",
    change: "+5.7%",
    trend: "up",
    icon: Users,
    color: "text-purple-600"
  }
]

export function EmailStatsCards() {
  return { stats }
}
