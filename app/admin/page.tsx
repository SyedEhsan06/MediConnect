'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  Users,
  FileText,
  AlertCircle,
  Settings,
  TrendingUp,
  MessageSquare,
  Shield,
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '2,543', icon: Users, change: '+12% this month' },
    { label: 'Active Posts', value: '5,234', icon: FileText, change: '+8% this month' },
    { label: 'Pending Reviews', value: '42', icon: AlertCircle, change: 'Urgent' },
    { label: 'Revenue', value: '₹2.3L', icon: TrendingUp, change: '+23% this month' },
  ];

  const recentReports = [
    { id: 1, title: 'Inappropriate post in NEET PG community', status: 'Pending', date: '2 hours ago' },
    { id: 2, title: 'Spam user account detected', status: 'Resolved', date: '5 hours ago' },
    { id: 3, title: 'Course content quality issue', status: 'Under Review', date: '1 day ago' },
  ];

  const menuItems = [
    { label: 'Moderation Queue', icon: Shield, href: '/admin/moderation/queue' },
    { label: 'User Management', icon: Users, href: '/admin/users/management' },
    { label: 'Content Management', icon: FileText, href: '/admin/content/management' },
    { label: 'Course Approvals', icon: FileText, href: '/admin/approvals/courses' },
    { label: 'Analytics', icon: BarChart3, href: '/admin/analytics/dashboard' },
    { label: 'Settings', icon: Settings, href: '/admin/settings/permissions' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-6">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage MediConnect platform</p>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="p-6 border-0 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <Icon className="w-8 h-8 text-accent" />
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <h3 className="text-muted-foreground text-sm font-medium mb-2">
                  {stat.label}
                </h3>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </Card>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {menuItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link key={idx} href={item.href}>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Recent Reports</h2>
              <Link href="/admin/moderation/reports">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>

            <Card className="border-0 divide-y divide-border overflow-hidden">
              {recentReports.map((report) => {
                const statusColor =
                  report.status === 'Pending'
                    ? 'bg-warning/10 text-warning'
                    : report.status === 'Resolved'
                    ? 'bg-success/10 text-success'
                    : 'bg-blue-100/50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300';

                return (
                  <div key={report.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{report.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{report.date}</p>
                      </div>
                      <Badge className={`text-xs whitespace-nowrap ${statusColor}`}>
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </Card>
          </div>
        </div>

        {/* System Health */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border-0">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              System Health
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground">Server Status</span>
                  <span className="text-xs text-success font-medium">Healthy</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success rounded-full h-2 w-full" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground">Database Performance</span>
                  <span className="text-xs text-success font-medium">Good</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success rounded-full h-2 w-4/5" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground">API Response</span>
                  <span className="text-xs text-success font-medium">Fast</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success rounded-full h-2 w-11/12" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Key Metrics
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">User Growth</span>
                <span className="text-sm font-bold text-success">+12%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Engagement Rate</span>
                <span className="text-sm font-bold text-success">68%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Content Approval Rate</span>
                <span className="text-sm font-bold text-success">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg. Response Time</span>
                <span className="text-sm font-bold text-success">2.3s</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
