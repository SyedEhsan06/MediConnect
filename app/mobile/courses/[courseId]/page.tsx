'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockCourses } from '@/lib/constants/mock-data';
import { ArrowLeft, Play, BookOpen, Users, Star, Download, Award, Lock } from 'lucide-react';

export default function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const course = mockCourses.find(c => c.id === courseId);
  const [enrolled, setEnrolled] = useState(course?.enrolled || false);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-20">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Course not found</p>
          <Button asChild variant="outline">
            <Link href="/mobile/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    if (course.isPaid) {
      // Navigate to payment
      console.log('Redirecting to payment for', course.title);
    }
    setEnrolled(true);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary/95 text-primary-foreground pt-10 pb-8 px-4 relative overflow-hidden backdrop-blur-md border-b border-primary/20">
        <div className="absolute inset-0 bg-linear-to-tr from-primary via-primary/80 to-accent/80 opacity-50"></div>
        <div className="max-w-2xl mx-auto flex items-center justify-between mb-8 relative z-10">
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20 h-10 w-10 p-0 rounded-full" asChild>
            <Link href="/mobile/courses">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <span className="text-sm font-semibold tracking-wide uppercase">Course Overview</span>
          <div className="w-10" />
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="flex gap-4 mb-8 items-start">
            <div className="text-5xl bg-white/10 p-3 rounded-2xl shadow-inner border border-white/20 backdrop-blur-sm">{course.thumbnail}</div>
            <div className="flex-1 mt-1">
              <h1 className="text-2xl font-bold mb-2 leading-tight text-white drop-shadow-sm">{course.title}</h1>
              <p className="text-sm text-primary-foreground/90 font-medium flex items-center gap-1.5 opacity-95">
                <span className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">👨‍⚕️</span>  
                {course.instructor}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="bg-white/10 border border-white/20 rounded-xl p-3 backdrop-blur-md shadow-sm">
              <div className="flex items-center gap-1.5 mb-1 text-white">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-bold">{course.rating}</span>
              </div>
              <p className="text-xs text-primary-foreground/80">{course.reviews} reviews</p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-3 backdrop-blur-md shadow-sm">
              <div className="flex items-center gap-1.5 mb-1 text-white">
                <Users className="w-4 h-4" />
                <span className="font-bold">{course.students}+</span>
              </div>
              <p className="text-xs text-primary-foreground/80">Enrolled</p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-xl p-3 backdrop-blur-md shadow-sm">
              <div className="flex items-center gap-1.5 mb-1 text-white">
                <BookOpen className="w-4 h-4" />
                <span className="font-bold">{course.lessons}</span>
              </div>
              <p className="text-xs text-primary-foreground/80">Lessons</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8 max-w-2xl mx-auto space-y-6">
        {/* Description */}
        <div className="bg-card border border-border shadow-xs rounded-2xl p-5">
          <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-primary rounded-full"></span>
            About this course
          </h2>
          <p className="text-[15px] text-muted-foreground leading-relaxed">{course.description}</p>
        </div>

        {/* Course Info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/30 border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">Duration</p>
            <p className="font-bold text-foreground text-lg">{course.duration}</p>
          </div>
          <div className="bg-muted/30 border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">Level</p>
            <p className="font-bold text-foreground text-lg">{course.level}</p>
          </div>
          <div className="bg-muted/30 border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">Category</p>
            <p className="font-bold text-foreground text-lg">{course.category}</p>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <p className="text-[11px] uppercase tracking-wider text-primary mb-1 font-medium">Price</p>
            <p className="font-bold text-primary text-xl">
              {course.isPaid ? `₹${course.price}` : 'Free'}
            </p>
          </div>
        </div>

        {/* Curriculum */}
        {course.modules && course.modules.length > 0 && (
          <div className="bg-card border border-border shadow-xs rounded-2xl overflow-hidden mt-6">
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/20">
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                <span className="w-1 h-5 bg-accent rounded-full"></span>
                Curriculum
              </h2>
              <Badge variant="secondary" className="text-xs bg-accent/10 text-accent hover:bg-accent/20 border-0">{course.modules.length} modules</Badge>
            </div>

            <div className="divide-y divide-border">
              {course.modules.map((module) => (
                <div key={module.id} className="border-0">
                  <button
                    onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-muted transition-colors text-left"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-sm">{module.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{module.lessons.length} lessons</p>
                    </div>
                    <div className="text-muted-foreground">
                      {expandedModule === module.id ? '−' : '+'}
                    </div>
                  </button>

                  {/* Lessons */}
                  {expandedModule === module.id && (
                    <div className="bg-muted/50 divide-y divide-border">
                      {module.lessons.map((lesson) => (
                        <div key={lesson.id} className="px-4 py-3 flex items-center gap-3">
                          {enrolled && !lesson.completed ? (
                            <Play className="w-4 h-4 text-accent flex-shrink-0" />
                          ) : enrolled && lesson.completed ? (
                            <Award className="w-4 h-4 text-green-600 flex-shrink-0" />
                          ) : (
                            <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{lesson.title}</p>
                            <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructor Card */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="text-3xl">{course.instructorAvatar}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{course.instructor}</h3>
              <p className="text-xs text-muted-foreground mt-1">Verified Instructor</p>
              <p className="text-sm text-foreground mt-2 leading-relaxed">Expert instructor with years of experience in medical education. Passionate about making complex concepts easy to understand.</p>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h2 className="font-semibold text-foreground mb-3">What you&apos;ll learn</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-foreground">
              <span className="text-accent mt-1">✓</span>
              <span>Comprehensive understanding of core concepts</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-foreground">
              <span className="text-accent mt-1">✓</span>
              <span>Real-world case studies and clinical applications</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-foreground">
              <span className="text-accent mt-1">✓</span>
              <span>Practice quizzes and assessments</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-foreground">
              <span className="text-accent mt-1">✓</span>
              <span>Certificate of completion</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Sticky CTA Button */}
      <div className="fixed bottom-20 left-0 right-0 bg-card border-t border-border px-4 py-3">
        <div className="max-w-2xl mx-auto">
          {!enrolled ? (
            <Button className="w-full" size="lg" onClick={handleEnroll}>
              {course.isPaid ? `Enroll Now - ₹${course.price}` : 'Enroll for Free'}
            </Button>
          ) : (
            <Button className="w-full" size="lg" asChild>
              <Link href={`/mobile/courses/${course.id}/lessons`}>
                Continue Learning
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
    </div>
  );
}
