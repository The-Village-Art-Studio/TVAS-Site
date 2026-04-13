'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import Image from 'next/image';
import {useState} from 'react';

export default function Header() {
  const t = useTranslations('Navigation');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <header style={{ borderBottom: '1px solid var(--border)', padding: '1rem 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/logo.png" alt="TVAS Logo" width={50} height={50} />
          <span style={{ marginLeft: '1rem', fontWeight: 800, fontSize: '1.2rem', color: 'var(--foreground)' }}>
            THE VILLAGE <br /> ART STUDIO
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href as any} style={{ fontWeight: 500 }}>
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
