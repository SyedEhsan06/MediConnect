'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, DollarSign, Users } from 'lucide-react';

interface OpportunityCardProps {
  id: string;
  title: string;
  organization: string;
  type: 'Internship' | 'Research' | 'Residency' | 'Teaching' | 'Fellowship';
  location: string;
  duration: string;
  stipend: string;
  applications: number;
  deadline: string;
  description: string;
  featured?: boolean;
  onApply?: () => void;
}

export function OpportunityCard({
  id,
  title,
  organization,
  type,
  location,
  duration,
  stipend,
  applications,
  deadline,
  description,
  featured = false,
  onApply,
}: OpportunityCardProps) {
  const typeColors: Record<string, string> = {
    'Internship': 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300',
    'Research': 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300',
    'Residency': 'bg-accent/10 text-accent dark:text-accent',
    'Teaching': 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300',
    'Fellowship': 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300',
  };

  const isDeadlineSoon = () => {
    const deadline_date = new Date(deadline);
    const today = new Date();
    const daysLeft = Math.floor((deadline_date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 7;
  };

  return (
    <Card
      className={`p-4 hover:shadow-md transition-all border-0 ${
        featured ? 'border-l-4 border-accent shadow-md' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-sm text-foreground line-clamp-2">{title}</h3>
            {featured && (
              <Badge variant="secondary" className="text-xs bg-accent/20 text-accent whitespace-nowrap">
                Featured
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{organization}</p>
        </div>
        <Badge className={`text-xs whitespace-nowrap ${typeColors[type]}`}>
          {type}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-xs text-foreground leading-relaxed mb-4 line-clamp-2">
        {description}
      </p>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-y border-border">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <span className="text-xs text-foreground">{location}</span>
        </div>
        <div className="flex items-start gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <span className="text-xs text-foreground">{duration}</span>
        </div>
        <div className="flex items-start gap-2">
          <DollarSign className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <span className="text-xs text-foreground">{stipend}</span>
        </div>
        <div className="flex items-start gap-2">
          <Users className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <span className="text-xs text-foreground">{applications} applied</span>
        </div>
      </div>

      {/* Deadline */}
      <div className={`mb-4 p-2 rounded text-xs font-medium ${
        isDeadlineSoon()
          ? 'bg-error/10 text-error'
          : 'bg-muted/50 text-muted-foreground'
      }`}>
        Deadline: {new Date(deadline).toLocaleDateString('en-IN', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </div>

      {/* Action */}
      <Button
        className="w-full"
        size="sm"
        onClick={onApply}
      >
        Apply Now
      </Button>
    </Card>
  );
}
