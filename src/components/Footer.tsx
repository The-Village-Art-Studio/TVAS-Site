import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('Navigation');
  const tFooter = useTranslations('Footer');

  return (
    <footer style={{ 
      background: 'var(--background)', 
      padding: 'var(--section-spacing-desktop) 0 4rem',
      borderTop: '1px solid var(--border)' 
    }}>
      <div className="container" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '4rem',
        marginBottom: '6rem'
      }}>
        {/* Brand Column */}
        <div style={{ gridColumn: 'span 2' }}>
          <Image src="/logo.png" alt="The Village Art Studio Logo" width={52} height={52} style={{ marginBottom: '2.5rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
            {tFooter('brandName')}
          </h3>
          <p style={{ opacity: 0.5, maxWidth: '400px', fontSize: '1.05rem', lineHeight: '1.9' }}>
            {tFooter('tagline')}
          </p>
        </div>

        {/* Platform Column */}
        <div>
          <h4 style={{ marginBottom: '2.5rem', fontSize: '0.75rem', letterSpacing: '0.2em' }}>{tFooter('platformLabel')}</h4>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Link href="/podcast" className="nav-link" style={{ fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>{t('podcast')}</Link>
            <Link href="/showcase" className="nav-link" style={{ fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>{t('showcase')}</Link>
            <Link href="/workshops" className="nav-link" style={{ fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>{t('workshops')}</Link>
          </nav>
        </div>

        {/* Connect Column */}
        <div>
          <h4 style={{ marginBottom: '2.5rem', fontSize: '0.75rem', letterSpacing: '0.2em' }}>{tFooter('connectLabel')}</h4>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Link href="/about" className="nav-link" style={{ fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>{t('about')}</Link>
            <Link href="/for-artists" className="nav-link" style={{ fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>{t('forArtists')}</Link>
            <Link href="/partnerships" className="nav-link" style={{ fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>{t('partnerships')}</Link>
            <Link href="/contact" className="nav-link" style={{ fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>{t('contact')}</Link>
          </nav>
        </div>
      </div>

      <div className="container" style={{ 
        borderTop: '1px solid var(--border)', 
        paddingTop: '3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.75rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        opacity: 0.3,
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <p>© {new Date().getFullYear()} {tFooter('copyright')}</p>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ color: 'inherit', textDecoration: 'none' }}>TikTok</a>
        </div>
      </div>
    </footer>
  );
}
