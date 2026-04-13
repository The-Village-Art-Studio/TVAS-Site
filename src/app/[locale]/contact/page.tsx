import {useTranslations} from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('Navigation');
  return (
    <main className="container" style={{ padding: '8rem 0' }}>
      <h1>{t('contact')}</h1>
      <p style={{ marginTop: '2rem', fontSize: '1.2rem', opacity: 0.7 }}>
        Connect with us. This page will soon feature a contemporary inquiry form.
      </p>
    </main>
  );
}
