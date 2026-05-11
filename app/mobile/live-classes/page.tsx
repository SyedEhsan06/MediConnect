'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockLiveClasses } from '@/lib/constants/mock-data';
import { Play, Calendar, Users, ArrowRight } from 'lucide-react';

const statusColors: Record<string, string> = {
  live: 'bg-red-600',
  scheduled: 'bg-blue-600',
  completed: 'bg-gray-600',
};

const statusLabels: Record<string, string> = {
  live: 'LIVE NOW',
  scheduled: 'UPCOMING',
  completed: 'RECORDING AVAILABLE',
};

export default function LiveClassesPage() {
  const liveClasses = mockLiveClasses.sort((a, b) => {
    const order = { live: 0, scheduled: 1, completed: 2 };
    return order[a.status as keyof typeof order] - order[b.status as keyof typeof order];
  });

  const activeClass = liveClasses.find(c => c.status === 'live');
  const upcomingClasses = liveClasses.filter(c => c.status === 'scheduled');
  const pastClasses = liveClasses.filter(c => c.status === 'completed');

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-accent to-accent/80 text-primary-foreground pt-6 pb-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Play className="w-5 h-5" />
            <h1 className="text-2xl font-bold">Live Classes</h1>
          </div>
          <p className="text-sm opacity-90">Interactive sessions with instructors</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 max-w-2xl mx-auto space-y-8">
        {/* Live Now */}
        {activeClass && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              Live Now
            </h2>
            <Link href={`/mobile/live-classes/${activeClass.id}`}>
              <div className="bg-red-600/10 border-2 border-red-600 rounded-xl p-4 hover:border-red-700 transition-colors cursor-pointer">
                <Badge className="bg-red-600 mb-3 animate-pulse">LIVE</Badge>
                <div className="flex gap-3 mb-3">
                  <div className="text-3xl">📹</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{activeClass.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{activeClass.instructor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{activeClass.participants} watching</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Upcoming Classes */}
        {upcomingClasses.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming</h2>
            <div className="space-y-3">
              {upcomingClasses.map(liveClass => (
                <Link key={liveClass.id} href={`/mobile/live-classes/${liveClass.id}`}>
                  <div className="bg-card border border-border rounded-xl p-4 hover:border-accent transition-colors cursor-pointer">
                    <Badge className="bg-blue-600 mb-3">UPCOMING</Badge>
                    <div className="flex gap-3 mb-3">
                      <div className="text-2xl">🎓</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{liveClass.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{liveClass.instructor}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(liveClass.scheduledTime).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{liveClass.participants} registered</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Past Recordings */}
        {pastClasses.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Past Recordings</h2>
            <div className="space-y-3">
              {pastClasses.map(liveClass => (
                <div key={liveClass.id} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex gap-3 mb-3">
                    <div className="text-2xl">📹</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{liveClass.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{liveClass.instructor}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{liveClass.participants} attended</span>
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/mobile/live-classes/${liveClass.id}`}>
                        Watch Recording
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
    </div>
  );
}
