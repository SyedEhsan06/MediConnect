'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, MessageSquare } from 'lucide-react';

interface CommunityCardProps {
  id: string;
  name: string;
  description: string;
  members: number;
  posts: number;
  avatar: string;
  banner: string;
  joined?: boolean;
  onJoin?: () => void;
}

export function CommunityCard({
  id,
  name,
  description,
  members,
  posts,
  avatar,
  banner,
  joined = false,
  onJoin,
}: CommunityCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow border-0">
      {/* Banner */}
      <div
        className="h-20 w-full"
        style={{ backgroundColor: banner }}
      />

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="h-12 w-12 -mt-8 border-2 border-card">
            <AvatarFallback
              style={{ backgroundColor: banner }}
              className="text-white font-semibold"
            >
              {name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-foreground line-clamp-1">{name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 py-3 border-y border-border">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{members.toLocaleString()} members</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{posts} posts</span>
          </div>
        </div>

        {/* Action */}
        <Button
          variant={joined ? 'outline' : 'default'}
          size="sm"
          className="w-full"
          onClick={onJoin}
        >
          {joined ? 'Joined' : 'Join Community'}
        </Button>
      </div>
    </Card>
  );
}
