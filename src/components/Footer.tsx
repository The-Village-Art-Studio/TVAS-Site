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
          <Image src="/logo.png" alt="The Village Art Studio Logo" width={60} height={60} style={{ marginBottom: '2rem' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 800 }}>
            {tFooter('brandName')}
          </h3>
          <p style={{ opacity: 0.6, maxWidth: '350px', fontSize: '1rem', lineHeight: '1.9' }}>
            {tFooter('tagline')}
          </p>
        </div>

        {/* Platform Column */}
        <div>
          <h4 style={{ marginBottom: '2rem', fontSize: '0.8rem' }}>{tFooter('platformLabel')}</h4>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <Link href="/podcast" className="link-editorial" style={{ fontSize: '0.9rem' }}>{t('podcast')}</Link>
            <Link href="/showcase" className="link-editorial" style={{ fontSize: '0.9rem' }}>{t('showcase')}</Link>
            <Link href="/workshops" className="link-editorial" style={{ fontSize: '0.9rem' }}>{t('workshops')}</Link>
          </nav>
        </div>

        {/* Connect Column */}
        <div>
          <h4 style={{ marginBottom: '2rem', fontSize: '0.8rem' }}>{tFooter('connectLabel')}</h4>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <Link href="/about" className="link-editorial" style={{ fontSize: '0.9rem' }}>{t('about')}</Link>
            <Link href="/for-artists" className="link-editorial" style={{ fontSize: '0.9rem' }}>{t('forArtists')}</Link>
            <Link href="/partnerships" className="link-editorial" style={{ fontSize: '0.9rem' }}>{t('partnerships')}</Link>
            <Link href="/contact" className="link-editorial" style={{ fontSize: '0.9rem' }}>{t('contact')}</Link>
          </nav>
        </div>
      </div>

      <div className="container" style={{ 
        borderTop: '1px solid var(--border)', 
        paddingTop: '3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.8rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        opacity: 0.4,
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <p>© {new Date().getFullYear()} {tFooter('copyright')}</p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
