import React from 'react';

interface EpisodeCardProps {
  number: string;
  title: string;
  artist: string;
  medium: string;
  duration: string;
  description: string;
}

export default function EpisodeCard({ 
  number, 
  title, 
  artist, 
  medium, 
  duration, 
  description 
}: EpisodeCardProps) {
  return (
    <div style={{ 
      borderTop: '1px solid rgba(0,0,0,0.06)', 
      paddingTop: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'baseline' }}>
        <span className="caption" style={{ 
          fontSize: '0.75rem', 
          color: 'var(--primary)',
          opacity: 0.5
        }}>{number}</span>
        <span className="caption" style={{ fontSize: '0.65rem', opacity: 0.3 }}>{duration}</span>
      </div>
      <div>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 800, lineHeight: 1.2 }}>{title}</h3>
        <p className="caption" style={{ fontSize: '0.75rem', opacity: 0.4 }}>
          {artist} &bull; {medium}
        </p>
      </div>
      <p style={{ fontSize: '1.05rem', lineHeight: '1.8', opacity: 0.65 }}>
        {description}
      </p>
      <button className="link-editorial" style={{ alignSelf: 'start', border: 'none', background: 'none', padding: 0 }}>
        Listen Now &rarr;
      </button>
    </div>
  );
}
