"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Mail, BarChart3, Users, Zap, CheckCircle, ArrowRight, Star, TrendingUp, Shield, Clock, Globe, Smartphone, Monitor } from 'lucide-react'
import Link from "next/link"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs"

const features = [
  {
    icon: Mail,
    title: "Email Campaigns",
    description: "Create and send beautiful email campaigns with our drag-and-drop editor"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track opens, clicks, and conversions with detailed reporting and insights"
  },
  {
    icon: Users,
    title: "Subscriber Management",
    description: "Organize and segment your audience for targeted messaging"
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Set up automated email sequences and workflows to nurture leads"
  },
  {
    icon: Shield,
    title: "Deliverability",
    description: "Ensure your emails reach the inbox with our advanced delivery optimization"
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Send emails worldwide with multi-language support and localization"
  }
]

const stats = [
  { number: "99.9%", label: "Uptime" },
  { number: "50M+", label: "Emails Sent" },
  { number: "10K+", label: "Happy Customers" },
  { number: "150+", label: "Countries" }
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    content: "EmailIt has transformed our email marketing. The analytics are incredible and the automation saves us hours every week.",
    rating: 5
  },
  {
    name: "Mike Chen",
    role: "E-commerce Manager",
    company: "ShopPlus",
    content: "The deliverability is outstanding. Our open rates increased by 40% after switching to EmailIt.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Startup Founder",
    company: "InnovateLab",
    content: "Perfect for growing businesses. The interface is intuitive and the support team is amazing.",
    rating: 5
  }
]

const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small businesses",
    features: [
      "Up to 10,000 emails/month",
      "Basic templates",
      "Email support",
      "Basic analytics"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: "$79",
    period: "/month",
    description: "For growing businesses",
    features: [
      "Up to 50,000 emails/month",
      "Advanced templates",
      "Priority support",
      "Advanced analytics",
      "A/B testing",
      "Automation workflows"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    description: "For large organizations",
    features: [
      "Unlimited emails",
      "Custom templates",
      "24/7 phone support",
      "Advanced reporting",
      "Custom integrations",
      "Dedicated account manager"
    ],
    popular: false
  }
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Mail className="size-4" />
            </div>
            <span className="text-xl font-bold">EmailIt</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-blue-600 transition-colors">Testimonials</a>
            <a href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors">Contact</a>
          </nav>
          
          <div className="flex items-center gap-2">
        <LoginLink>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Sign In
                    </button>
                  </LoginLink>
            <Button asChild size="sm">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-2">
              <Zap className="size-4 mr-2" />
              Now with AI-powered insights
            </Badge>
            
            <div className="space-y-4 max-w-4xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Email Marketing
                <span className="text-blue-600"> Made Simple</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Create, send, and track beautiful email campaigns that convert. 
                Join thousands of businesses growing with EmailIt.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Button asChild size="lg" className="flex-1">
                <Link href="/dashboard">
                  Start Free Trial
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Everything you need to succeed</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help you create, send, and optimize your email campaigns
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <feature.icon className="size-5" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Powerful Dashboard</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get insights into your email performance with our comprehensive analytics dashboard
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-3xl opacity-20"></div>
            <Card className="relative border-0 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white/20">
                      <Mail className="size-4" />
                    </div>
                    <span className="font-semibold">EmailIt Dashboard</span>
                  </div>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/dashboard">View Dashboard</Link>
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-4 mb-6">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-blue-600">24,567</div>
                    <div className="text-sm text-muted-foreground">Emails Sent</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-green-600">68.2%</div>
                    <div className="text-sm text-muted-foreground">Open Rate</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-orange-600">24.8%</div>
                    <div className="text-sm text-muted-foreground">Click Rate</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-purple-600">8,429</div>
                    <div className="text-sm text-muted-foreground">Subscribers</div>
                  </div>
                </div>
                <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <BarChart3 className="size-8 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">Interactive charts and analytics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Loved by thousands</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our customers have to say about EmailIt
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Simple, transparent pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that's right for your business. No hidden fees.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-blue-600 shadow-lg' : 'border-0 shadow-sm'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">
                      {plan.price}<span className="text-lg font-normal text-muted-foreground">{plan.period}</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="size-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to get started?</h2>
            <p className="text-lg opacity-90">
              Join thousands of businesses already using EmailIt to grow their audience and increase revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                className="bg-white text-black flex-1"
              />
              <Button variant="secondary" size="lg">
                Start Free Trial
              </Button>
            </div>
            <p className="text-sm opacity-75">
              No credit card required. 14-day free trial.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Mail className="size-4" />
                </div>
                <span className="text-xl font-bold">EmailIt</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The most powerful email marketing platform for growing businesses.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-8 border-t">
            <p className="text-sm text-muted-foreground">
              © 2024 EmailIt. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
