'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockCourses } from '@/lib/constants/mock-data';
import Link from 'next/link';
import { Search, BookOpen, Star } from 'lucide-react';

const categories = ['All', 'NEET PG', 'Anatomy', 'Cardiology', 'Pathology', 'Pharmacology'];
const difficulties = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const filteredCourses = mockCourses.filter(c => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All Levels' || c.level === selectedDifficulty;
    const matchesFree = !showFreeOnly || !c.isPaid;
    return matchesSearch && matchesCategory && matchesDifficulty && matchesFree;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-card border-b border-border">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Courses</h1>
              <p className="text-xs text-muted-foreground">Learn from expert instructors</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-2 bg-muted border-0"
            />
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-foreground">Category</p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  className="whitespace-nowrap"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Difficulty & Price Filter */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground">Level</p>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full text-sm border border-border rounded-lg px-2 py-1.5 bg-muted text-foreground"
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground">Price</p>
              <Button
                variant={showFreeOnly ? 'default' : 'outline'}
                size="sm"
                className="w-full"
                onClick={() => setShowFreeOnly(!showFreeOnly)}
              >
                {showFreeOnly ? 'Free Only' : 'All Courses'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="px-4 py-6 max-w-2xl mx-auto">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredCourses.map(course => (
              <Link key={course.id} href={`/mobile/courses/${course.id}`}>
                <div className="bg-card border border-border rounded-xl p-4 hover:border-accent transition-colors cursor-pointer">
                  <div className="flex gap-3 mb-3">
                    <div className="text-3xl">{course.thumbnail}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-foreground truncate text-sm">{course.title}</h3>
                        {course.enrolled && (
                          <Badge className="flex-shrink-0 bg-green-600">Enrolled</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{course.instructor}</p>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-semibold text-foreground">{course.rating}</span>
                        <span className="text-xs text-muted-foreground">({course.reviews})</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar (if enrolled) */}
                  {course.enrolled && course.progress > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs text-muted-foreground">Progress</p>
                        <p className="text-xs font-semibold text-foreground">{course.progress}%</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">{course.level}</Badge>
                      <Badge variant="outline" className="text-xs">{course.duration}</Badge>
                    </div>
                    {course.isPaid && (
                      <span className="text-sm font-bold text-accent">₹{course.price}</span>
                    )}
                    {!course.isPaid && (
                      <Badge className="bg-green-600 text-xs">Free</Badge>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No courses found matching your filters</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedDifficulty('All Levels');
                setShowFreeOnly(false);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
    </div>
  );
}
