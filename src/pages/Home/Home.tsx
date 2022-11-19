import { useTranslation } from 'react-i18next';

import './Home.pcss';
import welcomeImage from '@/assets/png/welcome-img.png';

export const Home = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <section className="home">
      <div className="container">
        <div className="home__wrapper">
          <div className="home__text">
            <h1 className='home__heading' dangerouslySetInnerHTML={{ __html: t('WELCOME.HEADING') }} />
            <div className="home__descr" >
              <p>{t('WELCOME.DESCR_P1')}</p>

              <div>
                {t('WELCOME.DESCR_P2')}
                <ul>
                  <li><span>{t('WELCOME.DESCR_POINT_1')}</span></li>
                  <li><span>{t('WELCOME.DESCR_POINT_2')}</span></li>
                  <li><span>{t('WELCOME.DESCR_POINT_3')}</span></li>
                  <li><span>{t('WELCOME.DESCR_POINT_4')}</span></li>
                </ul>
              </div>
            </div>
          </div>

          <img className='home__img' src={welcomeImage} alt="Welcome" />
        </div>
      </div>
    </section>
  );
};
