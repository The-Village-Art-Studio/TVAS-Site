import React from 'react';
import { Link } from '@/i18n/routing';

interface CTABannerProps {
  eyebrow: string;
  headline: string;
  body?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  theme?: 'light' | 'dark' | 'muted';
}

export default function CTABanner({ 
  eyebrow, 
  headline, 
  body, 
  primaryCta, 
  secondaryCta,
  theme = 'muted'
}: CTABannerProps) {
  const backgrounds = {
    light: 'var(--background)',
    dark: 'var(--foreground)',
    muted: 'var(--muted)'
  };

  const textColors = {
    light: 'var(--foreground)',
    dark: 'white',
    muted: 'var(--foreground)'
  };

  return (
    <section className="section" style={{ 
      background: backgrounds[theme],
      color: textColors[theme],
      textAlign: 'center'
    }}>
      <div className="container">
        <span className="caption" style={{ 
          display: 'block', 
          marginBottom: '2rem',
          color: theme === 'dark' ? 'var(--primary)' : undefined,
          opacity: theme === 'dark' ? 1 : 0.6
        }}>
          {eyebrow}
        </span>
        <h2 style={{ color: 'inherit', marginBottom: '2.5rem', lineHeight: 1.1 }}>{headline}</h2>
        {body && (
          <p style={{ 
            maxWidth: '680px', 
            margin: '0 auto 4rem', 
            opacity: 0.6,
            lineHeight: '1.9',
            fontSize: '1.1rem'
          }}>
            {body}
          </p>
        )}
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={primaryCta.href as any} className="btn btn-primary" style={{ padding: '1.25rem 3.5rem' }}>
            {primaryCta.label}
          </Link>
          {secondaryCta && (
            <Link 
              href={secondaryCta.href as any} 
              className="btn btn-outline"
              style={{ 
                color: theme === 'dark' ? 'white' : undefined,
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : undefined,
                padding: '1.25rem 3.5rem'
              }}
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
