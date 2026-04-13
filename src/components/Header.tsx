'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import Image from 'next/image';

export default function Header() {
  const t = useTranslations('Navigation');

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('podcast'), href: '/podcast' },
    { name: t('showcase'), href: '/showcase' },
    { name: t('workshops'), href: '/workshops' },
    { name: t('about'), href: '/about' },
    { name: t('forArtists'), href: '/for-artists' },
    { name: t('partnerships'), href: '/partnerships' },
    { name: t('contact'), href: '/contact' },
  ];

  return (
    <header style={{ 
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '1.5rem 0',
      borderBottom: '1px solid var(--border)'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <Image src="/logo.png" alt="TVAS Logo" width={54} height={54} priority />
          <div style={{ lineHeight: 1.1 }}>
            <span style={{ 
              display: 'block',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800, 
              fontSize: '1.25rem',
              letterSpacing: '-0.02em'
            }}>
              TVAS
            </span>
            <span style={{ 
              display: 'block',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontWeight: 600,
              opacity: 0.6
            }}>
              The Village Art Studio
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '2rem' }}>
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href as any} 
              style={{ 
                fontSize: '0.9rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'color 0.2s ease',
                color: 'var(--foreground)'
              }}
              className="nav-link"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
