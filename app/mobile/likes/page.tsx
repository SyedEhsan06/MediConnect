'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { PostCard } from '@/components/common/PostCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockPosts } from '@/lib/constants/mock-data';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { ArrowLeft } from 'lucide-react';

export default function LikesPage() {
  const [localPosts] = useLocalStorage<any[]>('mc_local_posts', []);
  const [likeState, setLikeState] = useLocalStorage<Record<string, boolean>>('mc_like_state', {});
  const [saveState, setSaveState] = useLocalStorage<Record<string, boolean>>('mc_save_state', {});

  const allPosts = useMemo(() => [...localPosts, ...mockPosts], [localPosts]);
  const likedPosts = allPosts.filter((post) => likeState[post.id] ?? post.liked);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/mobile">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold text-foreground">Liked Posts</h1>
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto space-y-3">
        {likedPosts.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-sm text-muted-foreground">You have not liked any posts yet.</p>
            <Button asChild className="mt-4">
              <Link href="/mobile">Browse feed</Link>
            </Button>
          </Card>
        ) : (
          likedPosts.map((post) => {
            const isLiked = likeState[post.id] ?? post.liked;
            const isSaved = saveState[post.id] ?? post.saved;
            const likeCount = post.liked === isLiked ? post.likes : Math.max(0, post.likes + (isLiked ? 1 : -1));

            return (
              <PostCard
                key={post.id}
                {...post}
                href={`/mobile/posts/${post.id}`}
                liked={isLiked}
                saved={isSaved}
                likes={likeCount}
                onLike={() => setLikeState((prev) => ({ ...prev, [post.id]: !isLiked }))}
                onSave={() => setSaveState((prev) => ({ ...prev, [post.id]: !isSaved }))}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
