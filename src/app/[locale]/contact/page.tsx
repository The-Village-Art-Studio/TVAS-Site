import {useTranslations} from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Pages.Contact.meta'});
  return {
    title: t('title'),
    description: t('description')
  };
}

export default function ContactPage() {
  const t = useTranslations('Pages.Contact');

  return (
    <main>
      <PageHero 
        eyebrow={t('hero.eyebrow')}
        headline={t('hero.headline')}
        lead={t('hero.lead')}
      />

      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '8rem'
          }}>
            {/* Contact Form */}
            <div>
              <form action="mailto:info@tvas.ca" method="get" encType="text/plain" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '3rem'
              }}>
                <div>
                  <label className="caption" style={{ display: 'block', fontSize: '0.65rem', marginBottom: '1rem', opacity: 0.4 }}>
                    {t('form.nameLabel')}
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    placeholder={t('form.namePlaceholder')}
                    required
                    style={{
                      width: '100%',
                      padding: '1.25rem 0',
                      border: 'none',
                      borderBottom: '1px solid rgba(0,0,0,0.1)',
                      background: 'transparent',
                      fontFamily: 'inherit',
                      fontSize: '1.1rem',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label className="caption" style={{ display: 'block', fontSize: '0.65rem', marginBottom: '1rem', opacity: 0.4 }}>
                    {t('form.emailLabel')}
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder={t('form.emailPlaceholder')}
                    required
                    style={{
                      width: '100%',
                      padding: '1.25rem 0',
                      border: 'none',
                      borderBottom: '1px solid rgba(0,0,0,0.1)',
                      background: 'transparent',
                      fontFamily: 'inherit',
                      fontSize: '1.1rem',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label className="caption" style={{ display: 'block', fontSize: '0.65rem', marginBottom: '1rem', opacity: 0.4 }}>
                    {t('form.subjectLabel')}
                  </label>
                  <select 
                    name="subject"
                    style={{
                      width: '100%',
                      padding: '1.25rem 0',
                      border: 'none',
                      borderBottom: '1px solid rgba(0,0,0,0.1)',
                      background: 'transparent',
                      fontFamily: 'inherit',
                      fontSize: '1.1rem',
                      outline: 'none',
                      appearance: 'none'
                    }}
                  >
                    <option value="General inquiry">{t('form.subjectPlaceholder')}</option>
                    <option value={t('paths.artist.subject')}>{t('paths.artist.label')}</option>
                    <option value={t('paths.partner.subject')}>{t('paths.partner.label')}</option>
                  </select>
                </div>
                <div>
                  <label className="caption" style={{ display: 'block', fontSize: '0.65rem', marginBottom: '1rem', opacity: 0.4 }}>
                    {t('form.messageLabel')}
                  </label>
                  <textarea 
                    name="body"
                    rows={6}
                    placeholder={t('form.messagePlaceholder')}
                    required
                    style={{
                      width: '100%',
                      padding: '1.25rem 0',
                      border: 'none',
                      borderBottom: '1px solid rgba(0,0,0,0.1)',
                      background: 'transparent',
                      fontFamily: 'inherit',
                      fontSize: '1.1rem',
                      outline: 'none',
                      resize: 'none'
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.5rem', marginTop: '2rem' }}>
                  {t('form.submit')}
                </button>
              </form>
            </div>

            {/* Contact Info & Paths */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.2 }}>{t('paths.artist.label')}</h3>
                  <p style={{ opacity: 0.65, lineHeight: '1.8', fontSize: '1.05rem' }}>{t('paths.artist.description')}</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.2 }}>{t('paths.partner.label')}</h3>
                  <p style={{ opacity: 0.65, lineHeight: '1.8', fontSize: '1.05rem' }}>{t('paths.partner.description')}</p>
                </div>
              </div>

              <div style={{ 
                borderTop: '1px solid rgba(0,0,0,0.06)', 
                paddingTop: '4rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '3rem'
              }}>
                <div>
                  <span className="caption" style={{ display: 'block', fontSize: '0.65rem', opacity: 0.4, marginBottom: '1rem' }}>
                    {t('info.emailLabel')}
                  </span>
                  <a href={`mailto:${t('info.email')}`} className="link-editorial" style={{ fontSize: '1.1rem' }}>
                    {t('info.email')}
                  </a>
                </div>
                <div>
                  <span className="caption" style={{ display: 'block', fontSize: '0.65rem', opacity: 0.4, marginBottom: '1rem' }}>
                    {t('info.locationLabel')}
                  </span>
                  <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>{t('info.location')}</p>
                </div>
                <div>
                  <span className="caption" style={{ display: 'block', fontSize: '0.65rem', opacity: 0.4, marginBottom: '1rem' }}>
                    {t('info.followLabel')}
                  </span>
                  <div style={{ display: 'flex', gap: '2rem' }}>
                    <a href="#" className="link-editorial" style={{ fontSize: '1rem' }}>Instagram</a>
                    <a href="#" className="link-editorial" style={{ fontSize: '1rem' }}>TikTok</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
