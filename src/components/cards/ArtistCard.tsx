import React from 'react';

interface ArtistCardProps {
  name: string;
  medium: string;
  quote?: string;
  imageUrl?: string;
}

export default function ArtistCard({ name, medium, quote, imageUrl }: ArtistCardProps) {
  return (
    <div className="card-artist" style={{ overflow: 'hidden', borderRadius: '4px' }}>
      <div style={{ 
        aspectRatio: '1', 
        background: imageUrl ? `url(${imageUrl}) center/cover` : 'var(--muted)',
        marginBottom: '1.5rem',
        borderRadius: '4px'
      }} className="card-artist-image" />
      <div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', fontWeight: 800 }}>{name}</h3>
        <p style={{ 
          fontSize: '0.75rem', 
          textTransform: 'uppercase', 
          letterSpacing: '0.1em', 
          fontWeight: 600, 
          opacity: 0.5,
          marginBottom: quote ? '1rem' : '0'
        }}>
          {medium}
        </p>
        {quote && (
          <p style={{ fontSize: '0.9rem', fontStyle: 'italic', opacity: 0.7, lineHeight: '1.6' }}>
            &ldquo;{quote}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}
