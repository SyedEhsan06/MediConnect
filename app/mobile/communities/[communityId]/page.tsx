'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PostCard } from '@/components/common/PostCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { mockCommunities, mockPosts, mockUsers } from '@/lib/constants/mock-data';
import { Users, MessageSquare, BookOpen, Share2, Bell, ArrowLeft } from 'lucide-react';

export default function CommunityDetailPage() {
  const params = useParams();
  const communityId = params.communityId as string;

  const community = mockCommunities.find(c => c.id === communityId) || mockCommunities[0];
  const [isJoined, setIsJoined] = useState(community.joinedStatus);
  const [activeTab, setActiveTab] = useState('posts');
  const communityPosts = mockPosts.filter(p => p.community?.id === community.id);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-card border-b border-border p-4 flex items-center justify-between">
        <Link href="/mobile/communities" className="text-foreground hover:text-accent">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-bold text-foreground flex-1 text-center line-clamp-1 px-2">
          {community.name}
        </h1>
        <Button variant="ghost" size="sm" className="rounded-lg">
          <Bell className="w-5 h-5" />
        </Button>
      </div>

      {/* Banner & Info */}
      <div>
        <div
          className="h-32 w-full"
          style={{ backgroundColor: community.banner }}
        />

        <div className="px-4 -mt-16 pb-4 relative z-10">
          <Card className="p-4 border-0 shadow-md">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-foreground mb-2">{community.name}</h2>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                {community.description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-y border-border">
              <div className="text-center">
                <Users className="w-5 h-5 text-accent mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">
                  {community.members.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Members</p>
              </div>
              <div className="text-center">
                <MessageSquare className="w-5 h-5 text-accent mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">
                  {community.posts.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Posts</p>
              </div>
            </div>

            {/* Join Button */}
            <Button
              className="w-full mb-3"
              variant={isJoined ? 'outline' : 'default'}
              onClick={() => setIsJoined(!isJoined)}
            >
              {isJoined ? 'Joined' : 'Join Community'}
            </Button>

            {/* Share Button */}
            <Button variant="outline" className="w-full" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-4">
        <div className="grid w-full grid-cols-3 gap-2">
          <Button
            variant={activeTab === 'posts' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </Button>
          <Button
            variant={activeTab === 'rules' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('rules')}
          >
            Rules
          </Button>
          <Button
            variant={activeTab === 'members' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('members')}
          >
            Members
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4 space-y-4 max-w-2xl mx-auto">
        {activeTab === 'posts' && (
          <>
            {communityPosts.length > 0 ? (
              communityPosts.map(post => (
                <PostCard key={post.id} {...post} liked={false} saved={false} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts yet in this community</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'rules' && (
          <Card className="p-4 border-0">
            <h3 className="font-semibold text-foreground mb-3">Community Rules</h3>
            <ul className="space-y-2">
              {community.rules.map((rule, idx) => (
                <li key={idx} className="flex gap-3 text-sm">
                  <span className="font-bold text-accent flex-shrink-0">{idx + 1}.</span>
                  <span className="text-foreground">{rule}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              Founder: <span className="font-medium text-foreground">{community.founder}</span>
            </p>
          </Card>
        )}

        {activeTab === 'members' && (
          <div className="space-y-2">
            {mockUsers.slice(0, 5).map(user => (
              <Card key={user.id} className="p-3 flex items-center justify-between border-0 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                </div>
                {user.verified && (
                  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.267 3.455a3.066 3.066 0 001.745-.723p.5.5 0 00.577.577c.355.689.863 1.304 1.457 1.798m-5.779 7.178a3 3 0 01-.567-3.539m1.378 6.917a6 6 0 01-.175-6.987m0 0a6 6 0 016.987.175m0 0a3 3 0 00.567 3.539" />
                  </svg>
                )}
              </Card>
            ))}
            <p className="text-xs text-muted-foreground text-center mt-4">
              And {Math.max(0, community.members - 5)} more members
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
    </div>
  );
}
