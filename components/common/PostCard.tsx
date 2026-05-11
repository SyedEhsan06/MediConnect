'use client';

import Link from 'next/link';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface PostCardProps {
  id: string;
  href?: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    badge?: string;
    verified?: boolean;
  };
  type: 'text' | 'mcq' | 'case' | 'poll' | 'pdf' | 'image' | 'video' | 'discussion' | 'course';
  title: string;
  content?: string;
  question?: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
  pollOptions?: Array<{ text: string; votes: number }>;
  imageUrl?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  duration?: string;
  courseId?: string;
  courseName?: string;
  courseImage?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares?: number;
  tags: string[];
  community?: { id: string; name: string };
  liked: boolean;
  saved: boolean;
  onLike?: () => void;
  onSave?: () => void;
}

export function PostCard({
  id,
  href,
  author,
  type,
  title,
  content,
  question,
  options,
  correctAnswer,
  explanation,
  pollOptions,
  imageUrl,
  videoUrl,
  videoThumbnail,
  duration,
  courseId,
  courseName,
  courseImage,
  timestamp,
  likes,
  comments,
  shares = 0,
  tags,
  community,
  liked,
  saved,
  onLike,
  onSave,
}: PostCardProps) {
  const totalPollVotes = pollOptions ? pollOptions.reduce((sum, opt) => sum + opt.votes, 0) : 0;

  return (
    <Card className="p-4 hover:shadow-md transition-shadow border-0 bg-card">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <Link href={`/mobile/profile/${author.id}`} className="shrink-0">
          <Avatar className="h-10 w-10">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/mobile/profile/${author.id}`}
              className="font-semibold text-sm text-foreground hover:text-accent transition-colors"
            >
              {author.name}
            </Link>
            {author.verified && (
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.267 3.455a3.066 3.066 0 001.745-.723p.5.5 0 00.577.577c.355.689.863 1.304 1.457 1.798m-5.779 7.178a3 3 0 01-.567-3.539m1.378 6.917a6 6 0 01-.175-6.987m0 0a6 6 0 016.987.175m0 0a3 3 0 00.567 3.539" />
              </svg>
            )}
            {author.badge && (
              <Badge variant="secondary" className="text-xs">{author.badge}</Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
          {community && (
            <div className="text-xs text-muted-foreground mt-1">
              in <span className="text-accent font-medium">{community.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        {href ? (
          <Link
            href={href}
            className="font-semibold text-sm mb-2 text-foreground block hover:text-accent transition-colors"
          >
            {title}
          </Link>
        ) : (
          <h3 className="font-semibold text-sm mb-2 text-foreground">{title}</h3>
        )}

        {type === 'text' && content && (
          <p className="text-sm text-foreground leading-relaxed line-clamp-3">{content}</p>
        )}

        {type === 'mcq' && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">{question}</p>
            <div className="space-y-2">
              {options?.map((option, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    idx === correctAnswer
                      ? 'bg-success/10 border-success/50'
                      : 'bg-muted/50 border-border hover:border-accent/50'
                  }`}
                >
                  <span className="text-sm text-foreground">{option}</span>
                </div>
              ))}
            </div>
            {explanation && (
              <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950/30 rounded border-l-2 border-info">
                <p className="text-xs text-info font-medium">Explanation:</p>
                <p className="text-xs text-foreground mt-1">{explanation}</p>
              </div>
            )}
          </div>
        )}

        {type === 'poll' && pollOptions && (
          <div className="space-y-3">
            {pollOptions.map((option, idx) => {
              const percentage = totalPollVotes ? (option.votes / totalPollVotes) * 100 : 0;
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{option.text}</span>
                    <span className="text-xs text-muted-foreground">{percentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-accent rounded-full h-2 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{option.votes} votes</span>
                </div>
              );
            })}
            <p className="text-xs text-muted-foreground text-center mt-2">
              Total: {totalPollVotes} votes
            </p>
          </div>
        )}

        {type === 'case' && content && (
          <div className="bg-muted/30 p-3 rounded-lg border border-border">
            <p className="text-sm text-foreground leading-relaxed">{content}</p>
          </div>
        )}

        {type === 'image' && imageUrl && (
          <div className="mt-3 rounded-lg overflow-hidden bg-muted h-80">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {type === 'video' && (
          <div className="mt-3 rounded-lg overflow-hidden bg-muted relative h-64">
            {videoThumbnail && (
              <img
                src={videoThumbnail}
                alt={title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="bg-accent rounded-full p-3 cursor-pointer hover:bg-accent/90">
                <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
            {duration && (
              <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {duration}
              </div>
            )}
          </div>
        )}

        {type === 'discussion' && content && (
          <p className="text-sm text-foreground leading-relaxed line-clamp-4">{content}</p>
        )}

        {type === 'course' && courseName && (
          <div className="mt-3 p-3 bg-linear-to-r from-accent/10 to-accent/5 rounded-lg border border-accent/30">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{courseImage}</div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-foreground">{courseName}</p>
                <p className="text-xs text-muted-foreground">{content}</p>
              </div>
              <Button size="sm" className="shrink-0">Enroll</Button>
            </div>
          </div>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs cursor-pointer hover:bg-accent/10"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{likes} likes</span>
          <span>{comments} comments</span>
          {shares > 0 && <span>{shares} shares</span>}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onLike}
          >
            <Heart
              className="w-4 h-4"
              fill={liked ? 'currentColor' : 'none'}
              color={liked ? '#DC2626' : 'currentColor'}
            />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MessageCircle className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onSave}
          >
            <Bookmark
              className="w-4 h-4"
              fill={saved ? 'currentColor' : 'none'}
            />
          </Button>
        </div>
      </div>
    </Card>
  );
}
