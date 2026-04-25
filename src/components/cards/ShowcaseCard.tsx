import React from 'react';

interface ShowcaseCardProps {
  month: string;
  artist: string;
  medium: string;
  series: string;
  imageUrl?: string;
}

export default function ShowcaseCard({ month, artist, medium, series, imageUrl }: ShowcaseCardProps) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px' }} className="card-hover">
      <div style={{ 
        aspectRatio: '1', 
        background: imageUrl ? `url(${imageUrl}) center/cover` : '#f0f0f0',
        borderRadius: '4px',
        transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }} />
      <div style={{
        padding: '2rem 0',
        background: 'transparent',
        color: 'var(--foreground)'
      }}>
        <span className="caption" style={{ 
          fontSize: '0.65rem', 
          color: 'var(--primary)',
          display: 'block',
          marginBottom: '1rem',
          opacity: 0.8
        }}>
          {series} &bull; {month}
        </span>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontWeight: 800 }}>{artist}</h3>
        <p className="caption" style={{ fontSize: '0.7rem', opacity: 0.4 }}>{medium}</p>
      </div>
    </div>
  );
}
