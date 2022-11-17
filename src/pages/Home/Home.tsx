import { useTranslation } from 'react-i18next';
import './Home.pcss';
import { TEXTS } from '../../app/constants';
import welcomeImage from '@/assets/png/welcome-img.png'

export const Home = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <section className="home">
      <div className="container">
        <div className="home__wrapper">
          <div className="home__text">
            <h1 className='home__heading' dangerouslySetInnerHTML={{ __html: TEXTS.english.welcomeHeader }}></h1>
            <div className="home__descr" dangerouslySetInnerHTML={{ __html: TEXTS.english.welcomeText }}></div>
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