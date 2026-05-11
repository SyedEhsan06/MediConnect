'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { mockPosts } from '@/lib/constants/mock-data';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { ArrowLeft, Heart, Bookmark, Pencil } from 'lucide-react';

export default function PostDetailPage() {
  const params = useParams();
  const postId = Array.isArray(params.postId) ? params.postId[0] : params.postId;

  const [localPosts] = useLocalStorage<any[]>('mc_local_posts', []);
  const [likeState, setLikeState] = useLocalStorage<Record<string, boolean>>('mc_like_state', {});
  const [saveState, setSaveState] = useLocalStorage<Record<string, boolean>>('mc_save_state', {});

  const post = useMemo(() => {
    return localPosts.find((item) => item.id === postId) || mockPosts.find((item) => item.id === postId);
  }, [localPosts, postId]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground">Post not found.</p>
          <Button asChild className="mt-4">
            <Link href="/mobile">Back to feed</Link>
          </Button>
        </Card>
      </div>
    );
  }

  const isLiked = likeState[post.id] ?? post.liked;
  const isSaved = saveState[post.id] ?? post.saved;
  const likeCount = post.liked === isLiked ? post.likes : Math.max(0, post.likes + (isLiked ? 1 : -1));

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/mobile">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold text-foreground flex-1">Post</h1>
        {post.id.startsWith('local-') && (
          <Button variant="outline" size="sm" asChild>
            <Link href={`/mobile/posts/${post.id}/edit`}>
              <Pencil className="w-4 h-4 mr-1" />
              Edit
            </Link>
          </Button>
        )}
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto space-y-4">
        <Card className="p-4 border-0 shadow-sm">
          <div className="flex items-start gap-3">
            <Avatar className="h-11 w-11">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
              {post.community && (
                <Badge variant="outline" className="mt-2 text-xs">
                  {post.community.name}
                </Badge>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <h2 className="text-lg font-semibold text-foreground">{post.title}</h2>
            {post.content && <p className="text-sm text-foreground leading-relaxed">{post.content}</p>}
            {post.imageUrl && (
              <img src={post.imageUrl} alt={post.title} className="w-full rounded-lg" />
            )}
            {post.videoUrl && (
              <div className="rounded-lg border border-border p-3 text-sm text-muted-foreground">
                Video link: {post.videoUrl}
              </div>
            )}
          </div>

          <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
            <span>{likeCount} likes</span>
            <span>{post.comments} comments</span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLikeState((prev) => ({ ...prev, [post.id]: !isLiked }))}
            >
              <Heart className="w-4 h-4 mr-2" fill={isLiked ? 'currentColor' : 'none'} />
              {isLiked ? 'Liked' : 'Like'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSaveState((prev) => ({ ...prev, [post.id]: !isSaved }))}
            >
              <Bookmark className="w-4 h-4 mr-2" fill={isSaved ? 'currentColor' : 'none'} />
              {isSaved ? 'Saved' : 'Save'}
            </Button>
          </div>
        </Card>

        <Card className="p-4 border-0">
          <h3 className="text-sm font-semibold text-foreground">Comments</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Comments are coming soon. You can already like, save, and edit your own posts.
          </p>
        </Card>
      </div>
    </div>
  );
}
