'use client';

import Link from 'next/link';
import { CourseCard } from '@/components/common/CourseCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { mockCourses, mockTrendingTopics, mockFeaturedCreators, mockPosts } from '@/lib/constants/mock-data';
import { TrendingUp, Users, BookOpen, Flame, ArrowRight } from 'lucide-react';

export default function ExplorePage() {
  const trendingCourses = mockCourses.sort((a, b) => b.students - a.students).slice(0, 4);
  const topPosts = mockPosts.sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments)).slice(0, 5);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h1 className="text-xl font-bold text-foreground">Explore & Discover</h1>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Trending topics, courses & creators</p>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-8 max-w-2xl mx-auto">

        {/* Trending Topics */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Trending Topics
            </h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-2">
            {mockTrendingTopics.slice(0, 5).map(topic => (
              <Link
                key={topic.id}
                href={`/mobile/search?q=${topic.title}`}
                className="block p-3 rounded-lg bg-card border border-border hover:border-accent transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{topic.image}</span>
                      <h3 className="font-semibold text-foreground">{topic.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">{topic.posts.toLocaleString()} posts</p>
                  </div>
                  <Badge className="flex-shrink-0 bg-orange-600">{topic.trend}</Badge>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Courses */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" />
              Trending Courses
            </h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/mobile/courses">View All <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
          <div className="space-y-3">
            {trendingCourses.map(course => (
              <Link key={course.id} href={`/mobile/courses/${course.id}`}>
                <CourseCard {...course} />
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Creators */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              Featured Creators
            </h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {mockFeaturedCreators.map(creator => (
              <Link
                key={creator.id}
                href={`/mobile/profile/${creator.id}`}
                className="block p-3 rounded-lg bg-card border border-border hover:border-accent transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Avatar>
                    <AvatarImage src={creator.avatar} alt={creator.name} />
                    <AvatarFallback>{creator.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground truncate">{creator.name}</h3>
                      {creator.verified && (
                        <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.267 3.455a3.066 3.066 0 001.745-.723p.5.5 0 00.577.577c.355.689.863 1.304 1.457 1.798m-5.779 7.178a3 3 0 01-.567-3.539m1.378 6.917a6 6 0 01-.175-6.987m0 0a6 6 0 016.987.175m0 0a3 3 0 00.567 3.539" />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{creator.bio}</p>
                  </div>
                </div>
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <span>{creator.followers.toLocaleString()} followers</span>
                  <span>•</span>
                  <span>{creator.postsCount} posts</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Hot Discussions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Hot Discussions</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {topPosts.filter(p => p.type === 'discussion').slice(0, 3).map(post => (
              <Link
                key={post.id}
                href={`/mobile/post/${post.id}`}
                className="block p-3 rounded-lg bg-card border border-border hover:border-accent transition-colors"
              >
                <h3 className="font-semibold text-sm text-foreground mb-1">{post.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{post.content}</p>
                <div className="flex gap-3 text-xs text-muted-foreground mt-2">
                  <span>{post.likes} likes</span>
                  <span>{post.comments} comments</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>

      {/* Bottom Navigation */}
    </div>
  );
}
