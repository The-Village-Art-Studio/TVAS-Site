import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('Navigation');
  const tFooter = useTranslations('Footer');

  return (
    <footer className="relative z-10 bg-background/60 backdrop-blur-xl py-24 lg:pt-32 lg:pb-16 border-t border-border">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-20">
        {/* Brand Column */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-8 group">
            <Image src="/logo.png" width={40} height={40} alt="Logo" className="group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-3xl font-extrabold tracking-tighter">
              {tFooter('brandName')}
            </h3>
          </div>
          <p className="text-muted-foreground/80 max-w-md text-xl leading-relaxed font-medium">
            {tFooter('tagline')}
          </p>
        </div>

        {/* Platform Column */}
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-8">
            {tFooter('platformLabel')}
          </h4>
          <nav className="flex flex-col gap-4">
            <Link href="/podcast" className="text-foreground/70 hover:text-primary transition-colors font-bold text-lg">{t('podcast')}</Link>
            <Link href="/showcase" className="text-foreground/70 hover:text-primary transition-colors font-bold text-lg">{t('showcase')}</Link>
            <Link href="/workshops" className="text-foreground/70 hover:text-primary transition-colors font-bold text-lg">{t('workshops')}</Link>
          </nav>
        </div>

        {/* Connect Column */}
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-8">
            {tFooter('connectLabel')}
          </h4>
          <nav className="flex flex-col gap-4">
            <Link href="/about" className="text-foreground/70 hover:text-primary transition-colors font-bold text-lg">{t('about')}</Link>
            <Link href="/for-artists" className="text-foreground/70 hover:text-primary transition-colors font-bold text-lg">{t('forArtists')}</Link>
            <Link href="/partnerships" className="text-foreground/70 hover:text-primary transition-colors font-bold text-lg">{t('partnerships')}</Link>
            <Link href="/contact" className="text-foreground/70 hover:text-primary transition-colors font-bold text-lg">{t('contact')}</Link>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-12 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
          © {new Date().getFullYear()} {tFooter('copyright')}
        </p>
        <div className="flex gap-8">
          <a href="https://www.facebook.com/profile.php?id=61554590920288" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-primary transition-colors">
            Facebook
          </a>
          <a href="https://www.instagram.com/tvas.ca/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-primary transition-colors">
            Instagram
          </a>
          <a href="https://www.tiktok.com/@tvas.ca" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-primary transition-colors">
            TikTok
          </a>
        </div>
      </div>
    </footer>
  );
}
