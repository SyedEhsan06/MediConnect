'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PostCard } from '@/components/common/PostCard';
import { Stories } from '@/components/common/Stories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockPosts, mockUsers } from '@/lib/constants/mock-data';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Search, Plus, X } from 'lucide-react';
import { ThemeToggle } from '@/components/common/ThemeToggle';

export default function MobileHome() {
  const [localPosts] = useLocalStorage<any[]>('mc_local_posts', []);
  const [likeState, setLikeState] = useLocalStorage<Record<string, boolean>>('mc_like_state', {});
  const [saveState, setSaveState] = useLocalStorage<Record<string, boolean>>('mc_save_state', {});
  const [searchQuery, setSearchQuery] = useState('');

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const allPosts = useMemo(() => [...localPosts, ...mockPosts], [localPosts]);

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [allPosts, searchQuery]);

  const sortedPosts = useMemo(() => {
    const getCreatedAt = (post: any) => (post.createdAt ? new Date(post.createdAt).getTime() : 0);
    return [...filteredPosts].sort((a, b) => getCreatedAt(b) - getCreatedAt(a));
  }, [filteredPosts]);

  const getIsLiked = (post: any) => likeState[post.id] ?? post.liked;
  const getIsSaved = (post: any) => saveState[post.id] ?? post.saved;
  const getLikeCount = (post: any, isLiked: boolean) => {
    if (post.liked === isLiked) {
      return post.likes;
    }

    const next = post.likes + (isLiked ? 1 : -1);
    return next < 0 ? 0 : next;
  };

  const handleLike = (post: any) => {
    const current = likeState[post.id] ?? post.liked;
    setLikeState((prev) => ({
      ...prev,
      [post.id]: !current,
    }));
  };

  const handleSave = (post: any) => {
    const current = saveState[post.id] ?? post.saved;
    setSaveState((prev) => ({
      ...prev,
      [post.id]: !current,
    }));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="pt-4">
        <div className="flex items-center justify-between px-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">MediConnect</p>
            <h1 className="text-2xl font-semibold text-foreground">Feed</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
            >
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="px-3" asChild>
              <Link href="/mobile/likes">Likes</Link>
            </Button>
          </div>
        </div>

        <Stories users={mockUsers.slice(0, 5)} />

        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground">Latest updates from your network</p>
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
          sortedPosts.map((post) => {
            const isLiked = getIsLiked(post);
            const isSaved = getIsSaved(post);
            return (
              <PostCard
                key={post.id}
                {...post}
                href={`/mobile/posts/${post.id}`}
                liked={isLiked}
                saved={isSaved}
                likes={getLikeCount(post, isLiked)}
                onLike={() => handleLike(post)}
                onSave={() => handleSave(post)}
              />
            );
          })
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No posts found</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="mx-auto max-w-2xl w-full px-4 pt-6">
            <div className="bg-card rounded-2xl border border-border shadow-lg">
              <div className="flex items-center gap-2 p-4 border-b border-border">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts, tags, people..."
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-4 space-y-3">
                {searchQuery ? (
                  sortedPosts.slice(0, 6).map((post) => (
                    <Link
                      key={post.id}
                      href={`/mobile/posts/${post.id}`}
                      className="block rounded-lg border border-border p-3 hover:bg-muted transition-colors"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <p className="text-sm font-semibold text-foreground line-clamp-1">{post.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {post.author?.name} • {post.tags?.[0] || 'General'}
                      </p>
                    </Link>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Start typing to search the feed.
                  </div>
                )}
              </div>
              <div className="px-4 pb-4">
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="/mobile/search" onClick={() => setIsSearchOpen(false)}>
                    Open full search
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
    </div>
  );
}
