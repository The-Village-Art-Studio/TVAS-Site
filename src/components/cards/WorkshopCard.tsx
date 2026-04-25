import React from 'react';

interface WorkshopCardProps {
  title: string;
  artist: string;
  date: string;
  duration: string;
  capacity: string;
  description: string;
  cta: string;
}

export default function WorkshopCard({ 
  title, 
  artist, 
  date, 
  duration, 
  capacity, 
  description, 
  cta 
}: WorkshopCardProps) {
  return (
    <div style={{ 
      background: 'white', 
      padding: '3rem', 
      borderRadius: '4px', 
      borderTop: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 20px 50px rgba(0,0,0,0.04)',
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5rem',
      justifyContent: 'space-between'
    }}>
      <div>
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <span className="caption" style={{ 
            fontSize: '0.65rem',
            opacity: 0.4
          }}>{date}</span>
          <span className="caption" style={{ fontSize: '0.65rem', opacity: 0.4 }}>{duration} &bull; {capacity}</span>
        </div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800, lineHeight: 1.2 }}>{title}</h3>
        <p className="caption" style={{ fontSize: '0.75rem', color: 'var(--primary)', marginBottom: '2rem' }}>{artist}</p>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.8', opacity: 0.65, marginBottom: '2.5rem' }}>
          {description}
        </p>
      </div>
      <button className="link-editorial" style={{ alignSelf: 'start', padding: 0, border: 'none', background: 'none' }}>
        {cta} &rarr;
      </button>
    </div>
  );
}
