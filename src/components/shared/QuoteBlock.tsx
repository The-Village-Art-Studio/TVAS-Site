import React from 'react';

interface QuoteBlockProps {
  quote: string;
  attribution?: string;
}

export default function QuoteBlock({ quote, attribution }: QuoteBlockProps) {
  return (
    <section className="section" style={{ textAlign: 'center', background: 'white' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ 
          width: '60px',
          height: '1px',
          background: 'var(--primary)',
          margin: '0 auto 4rem',
          opacity: 0.3
        }} />
        <blockquote style={{ 
          fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', 
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          lineHeight: '1.2',
          marginBottom: '3.5rem',
          letterSpacing: '-0.04em'
        }}>
          {quote}
        </blockquote>
        {attribution && (
          <cite className="caption" style={{ 
            opacity: 0.4
          }}>
            &mdash; {attribution}
          </cite>
        )}
      </div>
    </section>
  );
}
