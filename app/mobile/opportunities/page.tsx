'use client';

import { useState } from 'react';
import { OpportunityCard } from '@/components/common/OpportunityCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockOpportunities } from '@/lib/constants/mock-data';
import { Search, Star } from 'lucide-react';

export default function OpportunitiesPage() {
  const [opportunities] = useState(mockOpportunities);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const types = ['Internship', 'Research', 'Residency', 'Teaching', 'Fellowship'];

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || opp.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-card border-b border-border">
        <div className="p-4 space-y-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">Opportunities</h1>
            <p className="text-xs text-muted-foreground">Internships, Residencies & More</p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search opportunities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-2 bg-muted border-0"
            />
          </div>

          {/* Type Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {types.map(type => (
              <Button
                key={type}
                variant={selectedType === type ? 'default' : 'outline'}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setSelectedType(selectedType === type ? null : type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Banner */}
      {filteredOpportunities.some(opp => opp.featured) && (
        <div className="px-4 py-4 max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-warning" fill="currentColor" />
            Featured Opportunities
          </h2>
          <div className="space-y-3">
            {filteredOpportunities
              .filter(opp => opp.featured)
              .map(opp => (
                <OpportunityCard
                  key={opp.id}
                  {...opp}
                  onApply={() => console.log('Apply to', opp.id)}
                />
              ))}
          </div>
        </div>
      )}

      {/* All Opportunities */}
      <div className="px-4 py-4 max-w-2xl mx-auto">
        {!filteredOpportunities.some(opp => opp.featured) && (
          <h2 className="text-sm font-semibold text-foreground mb-3">All Opportunities</h2>
        )}
        <div className="space-y-3">
          {filteredOpportunities
            .filter(opp => !opp.featured)
            .map(opp => (
              <OpportunityCard
                key={opp.id}
                {...opp}
                onApply={() => console.log('Apply to', opp.id)}
              />
            ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No opportunities found</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedType(null);
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
    </div>
  );
}
