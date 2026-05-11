'use client';

import { use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockLiveClasses } from '@/lib/constants/mock-data';
import { ArrowLeft, Users, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

export default function LiveClassRoomPage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = use(params);
  const liveClass = mockLiveClasses.find(c => c.id === classId);

  if (!liveClass) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-20">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Class not found</p>
          <Button asChild variant="outline">
            <Link href="/mobile/live-classes">Back to Classes</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isLive = liveClass.status === 'live';
  const isCompleted = liveClass.status === 'completed';

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Video Player */}
      <div className="bg-black relative w-full aspect-video flex items-center justify-center">
        <Button variant="ghost" size="sm" className="absolute top-4 left-4 text-white hover:bg-white/20 z-10" asChild>
          <Link href="/mobile/live-classes">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>

        {isLive ? (
          <div className="text-center text-white">
            <div className="text-5xl mb-4">📹</div>
            <p className="text-lg font-semibold">Live Stream</p>
            <p className="text-sm opacity-75 mt-2">Video player would display here</p>
          </div>
        ) : isCompleted ? (
          <div className="text-center text-white">
            <div className="text-5xl mb-4">▶️</div>
            <p className="text-lg font-semibold">Recording Available</p>
            <p className="text-sm opacity-75 mt-2">Tap to play recording</p>
          </div>
        ) : (
          <div className="text-center text-white">
            <div className="text-5xl mb-4">📅</div>
            <p className="text-lg font-semibold">Upcoming Class</p>
            <p className="text-sm opacity-75 mt-2">This class will start soon</p>
          </div>
        )}

        {isLive && (
          <Badge className="absolute top-4 right-4 bg-red-600 animate-pulse">LIVE</Badge>
        )}
      </div>

      {/* Class Info */}
      <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        {/* Title & Status */}
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{liveClass.title}</h1>
          <div className="flex items-center gap-2 mb-3">
            <div className="text-2xl">{liveClass.instructorAvatar}</div>
            <div>
              <p className="font-semibold text-foreground">{liveClass.instructor}</p>
              <p className="text-xs text-muted-foreground">Instructor</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <Users className="w-5 h-5 text-accent mx-auto mb-1" />
            <p className="text-sm font-semibold text-foreground">{liveClass.participants}</p>
            <p className="text-xs text-muted-foreground">{isLive ? 'Watching' : 'Registered'}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <MessageSquare className="w-5 h-5 text-accent mx-auto mb-1" />
            <p className="text-sm font-semibold text-foreground">{Math.floor(Math.random() * 100) + 50}</p>
            <p className="text-xs text-muted-foreground">Questions</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <ThumbsUp className="w-5 h-5 text-accent mx-auto mb-1" />
            <p className="text-sm font-semibold text-foreground">{Math.floor(Math.random() * 500) + 100}</p>
            <p className="text-xs text-muted-foreground">Likes</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h2 className="font-semibold text-foreground mb-2">About</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{liveClass.description}</p>
        </div>

        {/* Details */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Topic</p>
            <p className="font-semibold text-foreground">{liveClass.topic}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Category</p>
            <p className="font-semibold text-foreground">{liveClass.category}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="font-semibold text-foreground">{liveClass.duration} minutes</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="gap-2">
            <ThumbsUp className="w-4 h-4" />
            Like
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        {/* CTA Button */}
        {isLive && (
          <Button className="w-full" size="lg">
            Join Discussion
          </Button>
        )}

        {isCompleted && liveClass.recordingUrl && (
          <Button className="w-full" size="lg">
            Watch Full Recording
          </Button>
        )}
      </div>

      {/* Bottom Navigation */}
    </div>
  );
}
