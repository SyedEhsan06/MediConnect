'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { mockUsers, userStats } from '@/lib/constants/mock-data';
import {
  Settings,
  MessageSquare,
  Share2,
  Trophy,
  BookOpen,
  FileText,
  Target,
  Briefcase,
  Heart,
  Shield,
  TrendingUp,
} from 'lucide-react';

export default function ProfilePage() {
  const user = mockUsers[0]; // Using first user as current user for demo
  const [isFollowing, setIsFollowing] = useState(false);

  const stats = [
    { label: 'Posts', value: userStats.totalPosts, icon: MessageSquare },
    { label: 'Notes', value: userStats.totalNotes, icon: FileText },
    { label: 'Courses', value: userStats.totalCourses, icon: BookOpen },
    { label: 'Quizzes', value: userStats.quizzesTaken, icon: Target },
  ];

  const menuItems = [
    { label: 'Learning Analytics', icon: TrendingUp, href: '/mobile/profile/analytics' },
    { label: 'Saved Posts', icon: Heart, href: '#' },
    { label: 'My Notes', icon: FileText, href: '#' },
    { label: 'Achievements', icon: Trophy, href: '#' },
    { label: 'Settings', icon: Settings, href: '#' },
    { label: 'Help & Support', icon: Shield, href: '#' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-b from-accent/10 to-transparent pt-4">
        <div className="px-4 pb-4">
          {/* Top Actions */}
          <div className="flex items-center justify-end gap-2 mb-4">
            <Button variant="ghost" size="sm" className="rounded-lg">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-lg">
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Avatar */}
          <div className="text-center mb-4">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>

            {/* Name & Badge */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
              {user.verified && (
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.267 3.455a3.066 3.066 0 001.745-.723p.5.5 0 00.577.577c.355.689.863 1.304 1.457 1.798m-5.779 7.178a3 3 0 01-.567-3.539m1.378 6.917a6 6 0 01-.175-6.987m0 0a6 6 0 016.987.175m0 0a3 3 0 00.567 3.539" />
                </svg>
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-3">{user.bio}</p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {userStats.badges.map(badge => (
                <Badge key={badge} variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Follow Button */}
            <Button
              className="w-full mb-4"
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-4 py-4 max-w-2xl mx-auto">
        <div className="grid grid-cols-4 gap-2 mb-4">
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-3 text-center border-0">
                <Icon className="w-5 h-5 mx-auto mb-1 text-accent" />
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Reputation Section */}
        <Card className="p-4 border-0 mb-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Reputation</p>
              <p className="text-3xl font-bold text-foreground">{user.reputation}</p>
            </div>
            <div className="text-right">
              <Badge className="mb-2" variant="secondary">
                Level {Math.floor(user.reputation / 1000)}
              </Badge>
              <div className="w-32 h-2 bg-muted rounded-full">
                <div
                  className="h-2 bg-accent rounded-full"
                  style={{ width: `${(user.reputation % 1000) / 10}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Follow Stats */}
        <Card className="grid grid-cols-2 gap-4 p-4 border-0 mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Followers</p>
            <p className="text-2xl font-bold text-foreground">{user.followers}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Following</p>
            <p className="text-2xl font-bold text-foreground">{user.following}</p>
          </div>
        </Card>
      </div>

      {/* Menu Section */}
      <div className="px-4 py-4 max-w-2xl mx-auto space-y-2">
        {menuItems.map((item, idx) => {
          const Icon = typeof item.icon === 'string' ? null : item.icon;
          return (
            <Link
              key={idx}
              href={item.href}
              className="flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
              <span className="text-muted-foreground">›</span>
            </Link>
          );
        })}
      </div>

      {/* Bottom Navigation */}
    </div>
  );
}
