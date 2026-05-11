'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PostCard } from '@/components/common/PostCard';
import { mockPosts, mockUsers } from '@/lib/constants/mock-data';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { ArrowLeft } from 'lucide-react';

export default function UserProfilePage() {
  const params = useParams();
  const userId = Array.isArray(params.userId) ? params.userId[0] : params.userId;

  const [localPosts] = useLocalStorage<any[]>('mc_local_posts', []);
  const [likeState, setLikeState] = useLocalStorage<Record<string, boolean>>('mc_like_state', {});
  const [saveState, setSaveState] = useLocalStorage<Record<string, boolean>>('mc_save_state', {});
  const [isFollowing, setIsFollowing] = useState(false);

  const user = mockUsers.find((item) => item.id === userId);
  const allPosts = useMemo(() => [...localPosts, ...mockPosts], [localPosts]);
  const userPosts = allPosts.filter((post) => post.author?.id === userId);

  if (!user) {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground">User not found.</p>
          <Button asChild className="mt-4">
            <Link href="/mobile">Back to feed</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/mobile">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold text-foreground">Profile</h1>
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto space-y-4">
        <Card className="p-4 border-0 shadow-sm">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-foreground">{user.name}</h2>
                {user.verified && (
                  <Badge variant="secondary" className="text-xs">Verified</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{user.role} · {user.college}</p>
              {user.bio && <p className="text-sm text-foreground mt-2">{user.bio}</p>}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4 text-center">
            <div>
              <p className="text-sm font-semibold text-foreground">{userPosts.length}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{user.followers}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{user.following}</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
          </div>

          <Button className="w-full mt-4" onClick={() => setIsFollowing(!isFollowing)}>
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </Card>

        <div className="space-y-3">
          {userPosts.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-sm text-muted-foreground">No posts yet.</p>
            </Card>
          ) : (
            userPosts.map((post) => {
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
    </div>
  );
}
