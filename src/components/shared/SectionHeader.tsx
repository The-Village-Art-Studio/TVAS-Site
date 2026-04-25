import React from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  headline: string;
  lead?: string;
  align?: 'left' | 'center';
  maxWidth?: string;
}

export default function SectionHeader({ 
  eyebrow, 
  headline, 
  lead, 
  align = 'left',
  maxWidth = '800px'
}: SectionHeaderProps) {
  return (
    <div style={{ 
      marginBottom: '6rem', 
      textAlign: align,
      maxWidth: align === 'center' ? maxWidth : '100%',
      margin: align === 'center' ? '0 auto 6rem' : '0 0 6rem'
    }} className="reveal">
      <span className="caption" style={{ display: 'block', marginBottom: '2rem' }}>
        {eyebrow}
      </span>
      <h2 style={{ marginBottom: lead ? '2.5rem' : '0', lineHeight: 1.1 }}>{headline}</h2>
      {lead && (
        <p style={{ fontSize: '1.25rem', opacity: 0.6, lineHeight: '1.9', maxWidth: '750px', margin: align === 'center' ? '0 auto' : '0' }}>
          {lead}
        </p>
      )}
    </div>
  );
}
