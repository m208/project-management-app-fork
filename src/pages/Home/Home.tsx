import { useTranslation } from 'react-i18next';
import './Home.pcss';
import welcomeImage from '@/assets/png/welcome-img.png'

export const Home = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <section className="home">
      <div className="container">
        <div className="home__wrapper">
          <div className="home__text">
            {/* <h1 className='home__heading' dangerouslySetInnerHTML={{ __html: TEXTS.english.welcomeHeader }}></h1>
            <div className="home__descr" dangerouslySetInnerHTML={{ __html: TEXTS.english.welcomeText }}> */}
            <h1 className='home__heading' dangerouslySetInnerHTML={{ __html: t('WELCOME.HEADING') }}></h1>
            <div className="home__descr" >
              <p>{t('WELCOME.DESCR_P1')}</p>

              <p>
              {t('WELCOME.DESCR_P2')}

                <ul>
                  <li><span>{t('WELCOME.DESCR_POINT_1')}</span></li>
                  <li><span>{t('WELCOME.DESCR_POINT_2')}</span></li>
                  <li><span>{t('WELCOME.DESCR_POINT_3')}</span></li>
                  <li><span>{t('WELCOME.DESCR_POINT_4')}</span></li>
                </ul>
              </p>
            </div>
          </div>

          <img className='home__img' src={welcomeImage} alt="image" />
        </div>
      </div>
    </section>
  )
};
// export const Home = (): JSX.Element => {
//   const { t } = useTranslation();
//   return (
//     <section className="home">
//       <h1 className='home-heading'>{t('WELCOME.WELCOME')}</h1>
//       <p>{t('WELCOME.DESCR')}</p>
//     </section>
//   );
// };