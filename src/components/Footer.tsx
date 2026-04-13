import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('Navigation');

  return (
    <footer style={{ 
      background: 'var(--muted)', 
      padding: '5rem 0 3rem',
      borderTop: '1px solid var(--border)' 
    }}>
      <div className="container" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1.5fr 1fr 1fr', 
        gap: '4rem',
        marginBottom: '4rem'
      }}>
        {/* Brand Column */}
        <div>
          <Image src="/logo.png" alt="TVAS Logo" width={60} height={60} style={{ marginBottom: '1.5rem' }} />
          <p style={{ opacity: 0.7, maxWidth: '300px' }}>
            A contemporary creative platform for local artists in Toronto.
          </p>
        </div>

        {/* Links Column */}
        <div>
          <h4 style={{ marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
            Platform
          </h4>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <Link href="/podcast">{t('podcast')}</Link>
            <Link href="/showcase">{t('showcase')}</Link>
            <Link href="/workshops">{t('workshops')}</Link>
          </nav>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 style={{ marginBottom: '1.5rem', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
            Studio
          </h4>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <Link href="/about">{t('about')}</Link>
            <Link href="/for-artists">{t('forArtists')}</Link>
            <Link href="/contact">{t('contact')}</Link>
          </nav>
        </div>
      </div>

      <div className="container" style={{ 
        borderTop: '1px solid var(--border)', 
        paddingTop: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.9rem',
        opacity: 0.5
      }}>
        <p>© {new Date().getFullYear()} The Village Art Studio. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <span>Instagram</span>
          <span>TikTok</span>
        </div>
      </div>
    </footer>
  );
}
