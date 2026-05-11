'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, BookOpen, Users, Star } from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  category: string;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  image: string;
  lessons: number;
  progress?: number;
  enrolled?: boolean;
  onEnroll?: () => void;
}

export function CourseCard({
  id,
  title,
  instructor,
  category,
  rating,
  reviews,
  students,
  duration,
  level,
  price,
  image,
  lessons,
  progress = 0,
  enrolled = false,
  onEnroll,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow border-0 flex flex-col">
      {/* Thumbnail */}
      <div className="aspect-video bg-gradient-to-br from-accent to-accent/50 relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-2 right-2" variant="secondary">
          {level}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-2">
            {title}
          </h3>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-3">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs bg-accent text-accent-foreground">
                {instructor[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{instructor}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3"
                  fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
                  className={i < Math.floor(rating) ? 'text-warning' : 'text-muted'}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {rating} ({reviews.toLocaleString()})
            </span>
          </div>
        </div>

        {/* Course Meta */}
        <div className="space-y-2 text-xs text-muted-foreground mb-4 py-3 border-y border-border">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{lessons} lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{students.toLocaleString()} students</span>
          </div>
        </div>

        {/* Progress Bar (if enrolled) */}
        {enrolled && progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-foreground">Progress</span>
              <span className="text-xs text-muted-foreground">{progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-accent rounded-full h-2 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div>
            <span className="text-sm font-bold text-foreground">₹{price}</span>
          </div>
          <Button
            size="sm"
            variant={enrolled ? 'outline' : 'default'}
            onClick={onEnroll}
          >
            {enrolled ? 'Continue' : 'Enroll Now'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
