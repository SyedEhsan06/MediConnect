'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';

interface StoryUser {
  id: string;
  name: string;
  avatar: string;
  verified?: boolean;
}

interface StoriesProps {
  users: StoryUser[];
}

export function Stories({ users }: StoriesProps) {
  return (
    <div className="pt-4 pb-2 w-full">
      <div className="flex items-start gap-4 overflow-x-auto scrollbar-hide px-4">
        <button
          className="flex flex-col items-center gap-1.5 shrink-0"
          aria-label="Add story"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted border border-dashed border-border shadow-sm">
            <Plus className="h-5 w-5 text-muted-foreground" />
          </div>
          <span className="text-[11px] font-medium text-muted-foreground">Your story</span>
        </button>

        {users.map((user) => (
          <Link
            key={user.id}
            href={`/mobile/profile/${user.id}`}
            className="flex flex-col items-center gap-1.5 shrink-0 group"
          >
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-tr from-rose-500 via-fuchsia-500 to-indigo-500 p-[2px] shadow-sm group-hover:scale-105 transition-transform">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-background p-[2px]">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>
              {user.verified && (
                <div className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background bg-accent text-[8px] text-primary-foreground">
                  V
                </div>
              )}
            </div>
            <span className="text-[11px] font-medium text-foreground max-w-[64px] truncate text-center">
              {user.name.split(' ')[0]}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
