'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PostCard } from '@/components/common/PostCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockPosts, mockUsers } from '@/lib/constants/mock-data';
import { Search, TrendingUp, Plus, Filter } from 'lucide-react';

const SORT_OPTIONS = ['Latest', 'Most Liked', 'Most Commented', 'Trending'];
const FILTER_TAGS = ['All', 'NEET PG', 'Cardiology', 'Anatomy', 'Pharmacology', 'Surgery', 'Case Study'];

export default function MobileHome() {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState('Latest');
  const [filterTag, setFilterTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = filterTag === 'All' || post.tags.includes(filterTag);
    return matchesSearch && matchesTag;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'Most Liked':
        return b.likes - a.likes;
      case 'Most Commented':
        return b.comments - a.comments;
      case 'Trending':
        return (b.likes + b.comments) - (a.likes + a.comments);
      case 'Latest':
      default:
        return 0;
    }
  });

  const handleLike = (postId: string) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };

  const handleSave = (postId: string) => {
    const newSaved = new Set(savedPosts);
    if (newSaved.has(postId)) {
      newSaved.delete(postId);
    } else {
      newSaved.add(postId);
    }
    setSavedPosts(newSaved);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="px-4 py-3 space-y-3">
          {/* Title */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">MediConnect Feed</h1>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/mobile/search">
                <Search className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              className="pl-10 py-2 bg-muted border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter & Sort */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 text-sm border border-border rounded-lg px-2 py-1.5 bg-muted text-foreground"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <Button variant="outline" size="sm" className="px-3">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Tag Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {FILTER_TAGS.map(tag => (
              <Button
                key={tag}
                variant={filterTag === tag ? 'default' : 'outline'}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setFilterTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Create Post Button (Floating) */}
      <div className="fixed bottom-24 right-4 z-20">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl"
          asChild
        >
          <Link href="/mobile/create-post">
            <Plus className="w-6 h-6" />
          </Link>
        </Button>
      </div>

      {/* Feed Posts */}
      <div className="px-4 py-4 space-y-3 max-w-2xl mx-auto">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post, idx) => (
            <PostCard
              key={post.id}
              {...post}
              liked={likedPosts.has(post.id) || post.liked}
              saved={savedPosts.has(post.id) || post.saved}
              onLike={() => handleLike(post.id)}
              onSave={() => handleSave(post.id)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No posts found</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setFilterTag('All');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
    </div>
  );
}
