'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Heart,
  MessageSquare,
  UserPlus,
  FileText,
  Trophy,
  Bell,
  Flag,
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'milestone' | 'note';
  user?: { name: string; avatar: string };
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  icon: React.ReactNode;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: { name: 'Dr. Priya Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
    title: 'Liked your post',
    description: 'Understanding Anatomy in 10 Minutes',
    timestamp: '5 minutes ago',
    read: false,
    icon: <Heart className="w-5 h-5 text-error" />,
  },
  {
    id: '2',
    type: 'comment',
    user: { name: 'Rajesh Kumar', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh' },
    title: 'Commented on your post',
    description: 'Great explanation! This helps a lot.',
    timestamp: '2 hours ago',
    read: false,
    icon: <MessageSquare className="w-5 h-5 text-accent" />,
  },
  {
    id: '3',
    type: 'follow',
    user: { name: 'Aditya Patel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya' },
    title: 'Started following you',
    description: 'Aditya is interested in your content',
    timestamp: '4 hours ago',
    read: true,
    icon: <UserPlus className="w-5 h-5 text-accent" />,
  },
  {
    id: '4',
    type: 'milestone',
    title: 'Quiz Streak Milestone',
    description: 'You\'ve reached a 7-day quiz streak!',
    timestamp: '1 day ago',
    read: true,
    icon: <Trophy className="w-5 h-5 text-warning" />,
  },
  {
    id: '5',
    type: 'note',
    title: 'New note in your saved collection',
    description: 'Cardiology: Drug Interactions - 2 new pages',
    timestamp: '2 days ago',
    read: true,
    icon: <FileText className="w-5 h-5 text-accent" />,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-card border-b border-border p-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="px-4 py-4 space-y-2 max-w-2xl mx-auto">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <Card
              key={notification.id}
              className={`p-4 border-0 cursor-pointer transition-colors ${
                notification.read ? 'bg-card' : 'bg-accent/5 border-l-4 border-accent'
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {notification.user ? (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                      <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      {notification.icon}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {notification.user ? notification.user.name : 'MediConnect'}
                  </p>
                  <p className="text-sm text-muted-foreground">{notification.title}</p>
                  {notification.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      "{notification.description}"
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
                </div>

                {!notification.read && (
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2" />
                )}
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No notifications yet</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
    </div>
  );
}
