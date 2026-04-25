import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  eyebrow: string;
  headline: string;
  lead?: string;
  align?: 'left' | 'center';
  maxWidth?: string;
  icon?: LucideIcon;
}

export default function SectionHeader({ 
  eyebrow, 
  headline, 
  lead, 
  align = 'left',
  maxWidth = 'max-w-3xl',
  icon: Icon
}: SectionHeaderProps) {
  return (
    <div className={`mb-24 ${align === 'center' ? `mx-auto text-center ${maxWidth}` : 'text-left'}`}>
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-8 ${align === 'center' ? 'mx-auto' : ''}`}>
        {Icon && <Icon size={14} className="animate-pulse" />}
        {eyebrow}
      </div>
      <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1]">
        {headline}
      </h2>
      {lead && (
        <p className="text-xl text-muted-foreground/80 leading-relaxed">
          {lead}
        </p>
      )}
    </div>
  );
}
