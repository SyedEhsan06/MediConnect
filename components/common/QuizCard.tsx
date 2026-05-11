'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Clock, Users } from 'lucide-react';

interface QuizCardProps {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: number;
  duration: number;
  avgScore: number;
  participants: number;
  points: number;
  streak?: boolean;
  completed?: boolean;
  userScore?: number;
  onStart?: () => void;
}

export function QuizCard({
  id,
  title,
  category,
  difficulty,
  questions,
  duration,
  avgScore,
  participants,
  points,
  streak = false,
  completed = false,
  userScore,
  onStart,
}: QuizCardProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-success/10 text-success border-success/20';
      case 'Medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Hard':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-foreground';
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow border-0">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-sm text-foreground line-clamp-1">{title}</h3>
            {streak && (
              <Badge variant="secondary" className="text-xs bg-warning/10 text-warning">
                🔥 Streak
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
            <Badge variant="outline" className={`text-xs border ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </Badge>
          </div>
        </div>
      </div>

      {/* Quiz Details */}
      <div className="space-y-2 mb-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          <span>{questions} questions</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{duration} minutes</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>{participants.toLocaleString()} participants</span>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-muted/50 rounded-lg p-3 mb-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Avg Score</span>
          <span className="font-semibold text-foreground">{avgScore}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-accent rounded-full h-2 transition-all"
            style={{ width: `${avgScore}%` }}
          />
        </div>
      </div>

      {/* User Performance */}
      {completed && userScore !== undefined && (
        <div className="bg-success/10 rounded-lg p-2 mb-4 border border-success/20">
          <p className="text-xs text-success font-medium">
            Your Score: {userScore}% • +{points} points
          </p>
        </div>
      )}

      {/* Action Button */}
      <Button
        className="w-full"
        variant={completed ? 'outline' : 'default'}
        size="sm"
        onClick={onStart}
      >
        {completed ? 'Retake Quiz' : 'Start Quiz'}
      </Button>
    </Card>
  );
}
