'use client';

import { useState } from 'react';
import { NoteCard } from '@/components/common/NoteCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockNotes } from '@/lib/constants/mock-data';
import { Search, Plus } from 'lucide-react';

export default function NotesPage() {
  const [notes, setNotes] = useState(mockNotes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [savedNotes, setSavedNotes] = useState<Set<string>>(
    new Set(mockNotes.filter(n => n.saved).map(n => n.id))
  );

  const filteredNotes = notes.filter(note => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !selectedSubject || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const uniqueSubjects = Array.from(new Set(notes.map(n => n.subject)));

  const handleSave = (noteId: string) => {
    const newSaved = new Set(savedNotes);
    if (newSaved.has(noteId)) {
      newSaved.delete(noteId);
    } else {
      newSaved.add(noteId);
    }
    setSavedNotes(newSaved);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-card border-b border-border">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">Study Notes</h1>
              <p className="text-xs text-muted-foreground">Community-shared resources</p>
            </div>
            <Button variant="ghost" size="sm" className="rounded-lg">
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-2 bg-muted border-0"
            />
          </div>

          {/* Subject Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedSubject === null ? 'default' : 'outline'}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setSelectedSubject(null)}
            >
              All
            </Button>
            {uniqueSubjects.map(subject => (
              <Button
                key={subject}
                variant={selectedSubject === subject ? 'default' : 'outline'}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setSelectedSubject(selectedSubject === subject ? null : subject)}
              >
                {subject}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="px-4 py-4 space-y-4 max-w-2xl mx-auto">
        {filteredNotes.map(note => (
          <NoteCard
            key={note.id}
            {...note}
            saved={savedNotes.has(note.id) || note.saved}
            onSave={() => handleSave(note.id)}
            onDownload={() => console.log('Download note', note.id)}
          />
        ))}

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No notes found</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject(null);
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
    </div>
  );
}
