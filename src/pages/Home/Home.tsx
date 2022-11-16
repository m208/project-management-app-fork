import './Home.pcss';
import { TEXTS } from '../../app/constants';
import welcomeImage from '@/assets/png/welcome-img.png'

export const Home = (): JSX.Element => (
  <section className="home">
    <div className="container">
      <div className="home__wrapper">
        <div className="home__text">
          <h1 className='home__heading' dangerouslySetInnerHTML={{ __html: TEXTS.russian.welcomeHeader }}></h1>
          <div className="home__descr" dangerouslySetInnerHTML={{ __html: TEXTS.russian.welcomeText }}></div>
        </div>

        <img className='home__img' src={welcomeImage} alt="image" />
      </div>
    </div>
  </section>
);
