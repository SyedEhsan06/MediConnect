'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Download, Bookmark, Star, FileText } from 'lucide-react';

interface NoteCardProps {
  id: string;
  title: string;
  author: string;
  subject: string;
  pages: number;
  downloads: number;
  rating: number;
  uploadDate: string;
  format: string;
  size: string;
  saved?: boolean;
  onSave?: () => void;
  onDownload?: () => void;
}

export function NoteCard({
  id,
  title,
  author,
  subject,
  pages,
  downloads,
  rating,
  uploadDate,
  format,
  size,
  saved = false,
  onSave,
  onDownload,
}: NoteCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow border-0">
      <div className="flex items-start gap-3 mb-4">
        {/* File Icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
          <FileText className="w-6 h-6 text-accent" />
        </div>

        {/* Title and Meta */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-2">
            {title}
          </h3>

          {/* Author */}
          <div className="flex items-center gap-2 mb-3">
            <Avatar className="h-5 w-5">
              <AvatarFallback className="text-xs bg-muted text-foreground">
                {author[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{author}</span>
          </div>

          {/* Subject Badge */}
          <Badge variant="outline" className="text-xs">
            {subject}
          </Badge>
        </div>

        {/* Save Button */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 flex-shrink-0"
          onClick={onSave}
        >
          <Bookmark
            className="w-4 h-4"
            fill={saved ? 'currentColor' : 'none'}
            color={saved ? '#0D9488' : 'currentColor'}
          />
        </Button>
      </div>

      {/* Stats */}
      <div className="space-y-2 mb-4 py-3 border-y border-border text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>{pages} pages • {size}</span>
          <span>{format}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-warning" fill="currentColor" />
            <span>{rating}</span>
          </div>
          <span>{downloads.toLocaleString()} downloads</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Uploaded {uploadDate}
        </div>
      </div>

      {/* Action */}
      <Button
        className="w-full"
        size="sm"
        onClick={onDownload}
      >
        <Download className="w-4 h-4 mr-2" />
        Download
      </Button>
    </Card>
  );
}
