'use client';

import { useState } from 'react';
import { QuizCard } from '@/components/common/QuizCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockQuizzes, userStats, leaderboardData } from '@/lib/constants/mock-data';
import { Flame, Trophy, Zap } from 'lucide-react';

export default function QuizPage() {
  const [quizzes] = useState(mockQuizzes);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-card border-b border-border">
        <div className="p-4 space-y-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">Quiz Challenge</h1>
            <p className="text-xs text-muted-foreground">Test your medical knowledge</p>
          </div>
        </div>
      </div>

      {/* User Stats Banner */}
      <div className="px-4 py-4 max-w-2xl mx-auto">
        <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20 p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Flame className="w-5 h-5 text-warning" />
              </div>
              <p className="text-2xl font-bold text-foreground">{userStats.currentStreak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <p className="text-2xl font-bold text-foreground">{userStats.totalPoints}</p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Trophy className="w-5 h-5 text-warning" />
              </div>
              <p className="text-2xl font-bold text-foreground">{userStats.quizzesTaken}</p>
              <p className="text-xs text-muted-foreground">Quizzes</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Daily Challenge */}
      <div className="px-4 py-2 max-w-2xl mx-auto">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Flame className="w-4 h-4 text-warning" />
          Today&apos;s Challenge
        </h2>
        <QuizCard
          {...quizzes[0]}
          onStart={() => console.log('Start quiz')}
        />
      </div>

      {/* All Quizzes */}
      <div className="px-4 py-4 max-w-2xl mx-auto space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Available Quizzes</h2>
        {quizzes.slice(1).map(quiz => (
          <QuizCard
            key={quiz.id}
            {...quiz}
            onStart={() => console.log('Start quiz', quiz.id)}
          />
        ))}
      </div>

      {/* Leaderboard Preview */}
      <div className="px-4 py-4 max-w-2xl mx-auto">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          Global Leaderboard
        </h2>
        <Card className="border-0 overflow-hidden">
          <div className="divide-y divide-border">
            {leaderboardData.slice(0, 5).map((entry) => (
              <div key={entry.rank} className="p-3 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="font-bold">
                    #{entry.rank}
                  </Badge>
                  <div>
                    <p className="text-sm font-medium text-foreground">{entry.user}</p>
                    <p className="text-xs text-muted-foreground">{entry.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-accent">{entry.points}</p>
                  <p className="text-xs text-muted-foreground">{entry.streak} day streak</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-muted/50 text-center">
            <Button variant="ghost" size="sm" className="w-full">
              View Full Leaderboard
            </Button>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
    </div>
  );
}
