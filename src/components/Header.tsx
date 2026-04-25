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
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '1.25rem 0',
      borderBottom: '1px solid var(--border)'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Image src="/logo.png" alt="The Village Art Studio Logo" width={52} height={52} priority />
          <div style={{ lineHeight: 1 }}>
            <span style={{ 
              display: 'block',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800, 
              fontSize: '1.35rem',
              letterSpacing: '-0.05em',
              marginBottom: '0.1rem'
            }}>
              TVAS
            </span>
            <span style={{ 
              display: 'block',
              fontSize: '0.6rem',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              fontWeight: 700,
              opacity: 0.5
            }}>
              The Village Art Studio
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '2.5rem' }}>
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href as any} 
              style={{ 
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                transition: 'all 0.3s ease',
                color: 'var(--foreground)',
                opacity: 0.7
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
