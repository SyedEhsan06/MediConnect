'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Image, Video, FileText, BarChart3 } from 'lucide-react';

const POST_TYPES = [
  { id: 'text', label: 'Text Post', icon: FileText, desc: 'Share your thoughts' },
  { id: 'image', label: 'Image', icon: Image, desc: 'Share images' },
  { id: 'video', label: 'Video', icon: Video, desc: 'Share videos' },
  { id: 'poll', label: 'Poll', icon: BarChart3, desc: 'Create a poll' },
];

const COMMUNITIES = [
  'NEET PG Preparation',
  'Anatomy Masters',
  'Cardiology Discussion',
  'Pathology Learning',
  'General Discussion',
];

export default function CreatePostPage() {
  const router = useRouter();
  const [postType, setPostType] = useState('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('General Discussion');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handlePost = () => {
    if (!title) {
      alert('Please enter a title');
      return;
    }
    router.push('/mobile');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/mobile">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold text-foreground">Create Post</h1>
        <Button
          className="ml-auto"
          onClick={handlePost}
          disabled={!title}
        >
          Post
        </Button>
      </div>

      {/* Content */}
      <div className="px-4 py-6 max-w-2xl mx-auto space-y-6 pb-24">

        {/* Post Type Selection */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">Post Type</h2>
          <div className="grid grid-cols-2 gap-3">
            {POST_TYPES.map(type => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setPostType(type.id)}
                  className={`p-3 rounded-lg border-2 transition-colors text-left ${
                    postType === type.id
                      ? 'border-accent bg-accent/10'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1 text-accent" />
                  <p className="font-semibold text-sm text-foreground">{type.label}</p>
                  <p className="text-xs text-muted-foreground">{type.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Community Selection */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-2">Community</h2>
          <select
            value={selectedCommunity}
            onChange={(e) => setSelectedCommunity(e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 bg-card text-foreground"
          >
            {COMMUNITIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-2">Title</h2>
          <Input
            placeholder="Enter post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-border"
          />
        </div>

        {/* Content */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-2">Content</h2>
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent min-h-32 resize-none"
          />
        </div>

        {/* Tags */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-2">Tags</h2>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add tags (e.g., Cardiology, NEET PG)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              className="border-border flex-1"
            />
            <Button variant="outline" onClick={handleAddTag}>Add</Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => handleRemoveTag(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Media Upload (for image/video) */}
        {(postType === 'image' || postType === 'video') && (
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-2">Upload {postType}</h2>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors">
              <div className="text-muted-foreground">
                <p className="font-medium">Click to upload or drag and drop</p>
                <p className="text-xs mt-1">{postType === 'image' ? 'PNG, JPG, GIF up to 10MB' : 'MP4, WebM up to 100MB'}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
