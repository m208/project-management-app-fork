import { useTranslation } from 'react-i18next';
import './Profile.pcss';

export const Profile = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <section className="profile">
      <h1 className='profile-heading'>{t('PROFILE.EDIT')}</h1>
    </section>
  );
};
