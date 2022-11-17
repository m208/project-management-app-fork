import { useTranslation } from 'react-i18next';
import './Home.pcss';

export const Home = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <section className="home">
      <h1 className='home-heading'>{t('WELCOME.WELCOME')}</h1>
      <p>{t('WELCOME.DESCR')}</p>
    </section>
  );
};
