'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  BarChart3,
  Users,
  DollarSign,
  Plus,
  TrendingUp,
} from 'lucide-react';

export default function CreatorDashboard() {
  const stats = [
    { label: 'Total Students', value: '1,240', icon: Users, change: '+5% this week' },
    { label: 'Courses Created', value: '8', icon: BookOpen, change: 'Active' },
    { label: 'Revenue', value: '₹45,230', icon: DollarSign, change: '+18% this month' },
    { label: 'Avg. Rating', value: '4.8/5', icon: TrendingUp, change: 'Excellent' },
  ];

  const courses = [
    {
      id: 1,
      title: 'Complete NEET PG 2025',
      students: 580,
      rating: 4.8,
      revenue: 145000,
      status: 'Active',
    },
    {
      id: 2,
      title: 'Anatomy for Clinical Practice',
      students: 320,
      rating: 4.9,
      revenue: 96000,
      status: 'Active',
    },
    {
      id: 3,
      title: 'ECG Interpretation Masterclass',
      students: 340,
      rating: 4.7,
      revenue: 102000,
      status: 'Active',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Creator Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your courses and revenue</p>
          </div>
          <Link href="/creator/courses/upload">
            <Button size="lg">
              <Plus className="w-5 h-5 mr-2" />
              New Course
            </Button>
          </Link>
        </div>
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

        {/* Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Your Courses</h2>
            <Link href="/creator/courses">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map(course => (
              <Card key={course.id} className="p-4 border-0 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground line-clamp-2">
                      {course.title}
                    </h3>
                    <Badge className="text-xs">{course.status}</Badge>
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-4 py-4 border-y border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Students</span>
                    <span className="font-medium text-foreground">{course.students}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-medium text-foreground">{course.rating}/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Revenue</span>
                    <span className="font-medium text-accent">₹{course.revenue}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Analytics
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border-0">
            <h3 className="font-bold text-foreground mb-4">Course Management</h3>
            <div className="space-y-2">
              <Link href="/creator/courses/upload">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload New Course
                </Button>
              </Link>
              <Link href="/creator/lessons/upload">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Lesson
                </Button>
              </Link>
              <Link href="/creator/quiz/builder">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Quiz
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 border-0">
            <h3 className="font-bold text-foreground mb-4">Analytics & Insights</h3>
            <div className="space-y-2">
              <Link href="/creator/analytics/students">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Student Analytics
                </Button>
              </Link>
              <Link href="/creator/analytics/revenue">
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Revenue Tracking
                </Button>
              </Link>
              <Link href="/creator/announcements">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Announcements
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
