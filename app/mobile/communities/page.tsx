'use client';

import { useState } from 'react';
import { CommunityCard } from '@/components/common/CommunityCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockCommunities } from '@/lib/constants/mock-data';
import { Search, Plus } from 'lucide-react';

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState(mockCommunities);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCommunities = communities.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoin = (communityId: string) => {
    setCommunities(communities.map(c =>
      c.id === communityId ? { ...c, joinedStatus: !c.joinedStatus } : c
    ));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-card border-b border-border">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">Communities</h1>
              <p className="text-xs text-muted-foreground">Join & discuss with peers</p>
            </div>
            <Button variant="ghost" size="sm" className="rounded-lg">
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-2 bg-muted border-0"
            />
          </div>
        </div>
      </div>

      {/* Communities Grid */}
      <div className="px-4 py-4 space-y-4 max-w-2xl mx-auto">
        {filteredCommunities.map(community => (
          <CommunityCard
            key={community.id}
            {...community}
            joined={community.joinedStatus}
            onJoin={() => handleJoin(community.id)}
          />
        ))}
      </div>

      {/* Bottom Navigation */}
    </div>
  );
}
