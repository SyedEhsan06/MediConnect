'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockAnalytics, userStats } from '@/lib/constants/mock-data';
import { ArrowLeft, TrendingUp, Target, Clock, Award } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-accent to-accent/80 text-primary-foreground pt-4 pb-6 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20" asChild>
            <Link href="/mobile/profile">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <span className="text-sm font-semibold">Learning Analytics</span>
          <div className="w-10" />
        </div>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Your Progress</h1>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4" />
                <span className="opacity-90">Study Hours</span>
              </div>
              <p className="text-xl font-bold">{userStats.studyHours}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4" />
                <span className="opacity-90">Avg Score</span>
              </div>
              <p className="text-xl font-bold">82%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        {/* Study Time Chart */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent" />
            Study Time This Week
          </h2>
          <div className="space-y-3">
            {mockAnalytics.learningTime.map((day) => (
              <div key={day.day} className="flex items-center gap-3">
                <p className="w-10 text-sm font-medium text-muted-foreground">{day.day}</p>
                <div className="flex-1">
                  <div className="bg-muted rounded-full h-2 relative overflow-hidden">
                    <div
                      className="bg-accent h-2 rounded-full transition-all"
                      style={{ width: `${(day.hours / 5.5) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground w-12 text-right">{day.hours}h</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">Total: 23.2 hours this week</p>
        </div>

        {/* Quiz Performance */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Quiz Performance by Subject
          </h2>
          <div className="space-y-3">
            {mockAnalytics.quizPerformance.map((subject) => (
              <div key={subject.subject} className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{subject.subject}</p>
                  <Badge className="bg-accent text-primary-foreground">{subject.accuracy}%</Badge>
                </div>
                <div className="bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-accent h-2 rounded-full transition-all"
                    style={{ width: `${subject.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-accent" />
            Course Progress
          </h2>
          <div className="space-y-4">
            {mockAnalytics.courseProgress.map((course) => (
              <div key={course.course} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{course.course}</p>
                  <p className="text-sm font-bold text-accent">{course.completion}%</p>
                </div>
                <div className="bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-accent to-accent/70 h-3 rounded-full transition-all"
                    style={{ width: `${course.completion}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h2 className="font-semibold text-foreground mb-4">Insights</h2>
          <div className="space-y-3">
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-3">
              <p className="text-sm font-medium text-green-900 dark:text-green-100">Strength</p>
              <p className="text-sm text-green-700 dark:text-green-200">Biochemistry with 88% accuracy - keep it up!</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
              <p className="text-sm font-medium text-orange-900 dark:text-orange-100">Area for Improvement</p>
              <p className="text-sm text-orange-700 dark:text-orange-200">Pharmacology at 72% - consider reviewing key concepts</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Recommendation</p>
              <p className="text-sm text-blue-700 dark:text-blue-200">Complete pharmacology course to strengthen weak areas</p>
            </div>
          </div>
        </div>

        {/* Statistics Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Quizzes Taken</p>
            <p className="text-2xl font-bold text-accent">{userStats.quizzesTaken}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Courses Completed</p>
            <p className="text-2xl font-bold text-accent">{userStats.completedCourses}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Current Streak</p>
            <p className="text-2xl font-bold text-accent">{userStats.currentStreak}d</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Certificates</p>
            <p className="text-2xl font-bold text-accent">{userStats.certificates}</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
    </div>
  );
}
