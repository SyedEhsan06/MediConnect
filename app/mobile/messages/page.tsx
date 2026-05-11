'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { mockUsers } from '@/lib/constants/mock-data';
import { Search, Plus, MessageCircle } from 'lucide-react';

interface Chat {
  id: string;
  user: (typeof mockUsers)[0];
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

const mockChats: Chat[] = [
  {
    id: '1',
    user: mockUsers[1],
    lastMessage: 'Can you help me with anatomy?',
    timestamp: '2 min ago',
    unread: 3,
    online: true,
  },
  {
    id: '2',
    user: mockUsers[2],
    lastMessage: 'Great explanation in the forum',
    timestamp: '1 hour ago',
    unread: 0,
    online: true,
  },
  {
    id: '3',
    user: mockUsers[3],
    lastMessage: 'Thanks for the study material',
    timestamp: '3 hours ago',
    unread: 1,
    online: false,
  },
  {
    id: '4',
    user: mockUsers[4],
    lastMessage: 'Let\'s discuss the quiz results',
    timestamp: 'Yesterday',
    unread: 0,
    online: false,
  },
];

export default function MessagesPage() {
  const [chats, setChats] = useState(mockChats);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter(chat =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = chats.reduce((sum, chat) => sum + chat.unread, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-card border-b border-border">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">Messages</h1>
              {unreadCount > 0 && (
                <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
              )}
            </div>
            <Button variant="ghost" size="sm" className="rounded-lg">
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-2 bg-muted border-0"
            />
          </div>
        </div>
      </div>

      {/* Chats List */}
      <div className="px-4 py-4 space-y-1 max-w-2xl mx-auto">
        {filteredChats.length > 0 ? (
          filteredChats.map(chat => (
            <Link
              key={chat.id}
              href={`/mobile/messages/${chat.id}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
            >
              {/* Avatar with Online Indicator */}
              <div className="relative flex-shrink-0">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={chat.user.avatar} alt={chat.user.name} />
                  <AvatarFallback>{chat.user.name[0]}</AvatarFallback>
                </Avatar>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-sm font-semibold text-foreground line-clamp-1">
                    {chat.user.name}
                  </p>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {chat.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {chat.lastMessage}
                </p>
              </div>

              {/* Unread Badge */}
              {chat.unread > 0 && (
                <Badge className="flex-shrink-0 rounded-full">
                  {chat.unread}
                </Badge>
              )}
            </Link>
          ))
        ) : (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No conversations found</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
    </div>
  );
}
