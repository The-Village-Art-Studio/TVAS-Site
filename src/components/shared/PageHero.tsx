import React from 'react';

interface PageHeroProps {
  eyebrow: string;
  headline: string;
  lead?: string;
  backgroundImage?: string;
}

export default function PageHero({ eyebrow, headline, lead, backgroundImage }: PageHeroProps) {
  return (
    <section style={{
      padding: '12rem 0 10rem',
      backgroundImage: backgroundImage ? `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${backgroundImage})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      textAlign: 'center',
      borderBottom: '1px solid var(--border)',
      background: backgroundImage ? undefined : 'var(--background)'
    }}>
      <div className="container reveal">
        <span className="caption" style={{ display: 'block', marginBottom: '2.5rem' }}>
          {eyebrow}
        </span>
        <h1 style={{ maxWidth: '900px', margin: '0 auto 3.5rem', lineHeight: 1.1 }}>
          {headline}
        </h1>
        {lead && (
          <p style={{
            fontSize: '1.25rem',
            maxWidth: '750px',
            margin: '0 auto',
            opacity: 0.6,
            lineHeight: '1.9',
            fontWeight: 400
          }}>
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
