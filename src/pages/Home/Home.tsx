import { useTranslation } from 'react-i18next';

import './Home.pcss';
import { teamMembers } from '@/app/constants';
import welcomeImage from '@/assets/png/welcome-img.png';

export const Home = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <section className="home">
        <div className="container">
          <div className="home__wrapper">
            <div className="home__text">
              <h1 className='home__heading'>
                <span className='home__heading_m'>{t('WELCOME.HEADING1')}</span>
                <span className='home__heading_s'>{t('WELCOME.HEADING2')}</span>
                <span className='home__heading_l'>{t('WELCOME.HEADING3')}</span>
              </h1>
              <div className="home__descr" >
                <p>{t('WELCOME.DESCR_P1')}</p>

                <div>
                  <p>{t('WELCOME.DESCR_P2')}</p>
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

      <section className="home-video">
        <div className="container">
          <div className="home-video__wrapper">
            <h2 className='home-video__heading'>How the app works</h2>
            <iframe src='https://www.youtube.com/embed/E7wJTI-1dvQ'
              frameBorder='0'
              allow='autoplay; encrypted-media'
              allowFullScreen
              title='video'
              className='video-frame'
            />
          </div>
        </div>

      </section>

      <section className="home-team">
        <div className="container">
          <h2 className='home-team__heading'>Our team</h2>
          <ul className='team-members'>
            {teamMembers.map(member => (
              <li key={member.id} className='member__card'>
                <img src={member.img} alt="member" className='member__img'/>
                <p className='member__name'>{member.name}</p>

                <ul className='member_poins'>
                  {
                    member.points.map(point => (
                      <li key='1' className='duty-point'><span>{point}</span></li>
                    ))
                  }
                </ul>
              </li>
            ))}
          </ul>
        </div>

      </section>
    </>
  );
};
