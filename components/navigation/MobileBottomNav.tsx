'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Target, Briefcase, User } from 'lucide-react';

const navItems = [
  { href: '/mobile', icon: Home, label: 'Home' },
  { href: '/mobile/courses', icon: BookOpen, label: 'Courses' },
  { href: '/mobile/quiz', icon: Target, label: 'Quiz' },
  { href: '/mobile/opportunities', icon: Briefcase, label: 'Opportunities' },
  { href: '/mobile/profile', icon: User, label: 'Profile' },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-40">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + '/');

            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-accent'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-64 bg-card border-r border-border z-40 p-4">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary-foreground font-bold">
            MC
          </div>
          <span className="text-xl font-bold text-foreground">MediConnect</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive =
              pathname === href || (pathname.startsWith(href + '/') && href !== '/mobile');

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-accent/10 text-accent font-semibold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
