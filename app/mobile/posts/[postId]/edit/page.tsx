'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { ArrowLeft } from 'lucide-react';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = Array.isArray(params.postId) ? params.postId[0] : params.postId;

  const [localPosts, setLocalPosts] = useLocalStorage<any[]>('mc_local_posts', []);

  const post = useMemo(() => localPosts.find((item) => item.id === postId), [localPosts, postId]);
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((item) => item !== tag));
  };

  const handleSave = () => {
    if (!post) {
      return;
    }

    const updatedPosts = localPosts.map((item) =>
      item.id === post.id
        ? {
            ...item,
            title,
            content,
            tags: tags.length ? tags : ['General'],
          }
        : item
    );

    setLocalPosts(updatedPosts);
    router.push(`/mobile/posts/${post.id}`);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground">Only posts created on this device can be edited.</p>
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
        <Link href={`/mobile/posts/${post.id}`}>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold text-foreground flex-1">Edit Post</h1>
        <Button onClick={handleSave} disabled={!title}>
          Save
        </Button>
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-2">Title</h2>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground mb-2">Content</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent min-h-32 resize-none"
          />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground mb-2">Tags</h2>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              className="border-border flex-1"
            />
            <Button variant="outline" onClick={handleAddTag}>
              Add
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => handleRemoveTag(tag)}
                >
                  {tag} x
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
