'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { mockUsers, mockCommunities, mockPosts, mockCourses } from '@/lib/constants/mock-data';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Search, Clock, X, BookOpen } from 'lucide-react';

export default function SearchPage() {
  const [localPosts] = useLocalStorage<any[]>('mc_local_posts', []);
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'NEET PG',
    'Anatomy',
    'Cardiology',
    'ECG Interpretation',
  ]);

  const allPosts = [...localPosts, ...mockPosts];
  const results = {
    courses: mockCourses.filter(c =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.instructor.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
    ),
    users: mockUsers.filter(u =>
      u.name.toLowerCase().includes(query.toLowerCase())
    ),
    communities: mockCommunities.filter(c =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
    ),
    posts: allPosts.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.content?.toLowerCase().includes(query.toLowerCase())
    ),
  };

  const removeRecentSearch = (search: string) => {
    setRecentSearches(recentSearches.filter(s => s !== search));
  };

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    if (!recentSearches.includes(searchTerm)) {
      setRecentSearches([searchTerm, ...recentSearches.slice(0, 3)]);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-card border-b border-border p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users, communities, posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 py-2 bg-muted border-0"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Results or Recent Searches */}
      <div className="px-4 py-4 max-w-2xl mx-auto">
        {!query ? (
          <>
            {/* Recent Searches */}
            <div>
              <h2 className="text-sm font-semibold text-foreground mb-3">Recent Searches</h2>
              <div className="space-y-2">
                {recentSearches.map(search => (
                  <div
                    key={search}
                    className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:bg-muted transition-colors cursor-pointer"
                    onClick={() => handleSearch(search)}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{search}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentSearch(search);
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-foreground mb-3">Trending Topics</h2>
              <div className="flex flex-wrap gap-2">
                {['NEET PG', 'ECG', 'Anatomy', 'Pharmacology', 'Surgery', 'Pathology'].map(
                  topic => (
                    <Button
                      key={topic}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSearch(topic)}
                    >
                      {topic}
                    </Button>
                  )
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Courses Results */}
            {results.courses.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Courses
                </h2>
                <div className="space-y-2">
                  {results.courses.map(course => (
                    <Link
                      key={course.id}
                      href={`/mobile/courses/${course.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:bg-muted transition-colors"
                    >
                      <div className="text-2xl shrink-0">{course.thumbnail}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-1">{course.title}</p>
                        <p className="text-xs text-muted-foreground">{course.instructor}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-semibold text-foreground">{course.rating}</span>
                          <span className="text-xs text-muted-foreground">({course.reviews})</span>
                        </div>
                      </div>
                      <div className="text-xs font-semibold text-accent shrink-0">
                        {course.isPaid ? `₹${course.price}` : 'Free'}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Users Results */}
            {results.users.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-foreground mb-3">Users</h2>
                <div className="space-y-2">
                  {results.users.map(user => (
                    <Link
                      key={user.id}
                      href={`/mobile/profile/${user.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:bg-muted transition-colors"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.role}</p>
                      </div>
                      {user.verified && (
                        <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.267 3.455a3.066 3.066 0 001.745-.723p.5.5 0 00.577.577c.355.689.863 1.304 1.457 1.798m-5.779 7.178a3 3 0 01-.567-3.539m1.378 6.917a6 6 0 01-.175-6.987m0 0a6 6 0 016.987.175m0 0a3 3 0 00.567 3.539" />
                        </svg>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Communities Results */}
            {results.communities.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-foreground mb-3">Communities</h2>
                <div className="space-y-2">
                  {results.communities.map(community => (
                    <Link
                      key={community.id}
                      href={`/mobile/communities/${community.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:bg-muted transition-colors"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm shrink-0"
                        style={{ backgroundColor: community.banner }}
                      >
                        {community.name.slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-1">
                          {community.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {community.members} members
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Posts Results */}
            {results.posts.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-foreground mb-3">Posts</h2>
                <div className="space-y-2">
                  {results.posts.map(post => (
                    <Link
                      key={post.id}
                      href={`/mobile/posts/${post.id}`}
                      className="block"
                    >
                      <Card className="p-3 border-0 bg-card hover:bg-muted transition-colors cursor-pointer">
                        <p className="text-sm font-medium text-foreground line-clamp-1">
                          {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {post.content || post.question}
                        </p>
                        {post.community && (
                          <Badge variant="outline" className="text-xs mt-2">
                            {post.community.name}
                          </Badge>
                        )}
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {!results.courses.length && !results.users.length && !results.communities.length && !results.posts.length && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No results found for "{query}"</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom Navigation */}
    </div>
  );
}
