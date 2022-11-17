import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { LangSwitcher } from '../LangSwitcher/LangSwitcher';
import { Link } from '../Link/Link';

import { saveLocalOnLogout } from '@/app/auth';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { authSlice } from '@/store/reducers/AuthSlice';

import './Header.pcss';

export const Header = (): JSX.Element => {
  const { t } = useTranslation();
  const { isLoggedIn, user } = useAppSelector(state => state.authReducer);
  const { logOff } = authSlice.actions;
  const dispatch = useAppDispatch();

  const logOut = () =>{
    dispatch(logOff());
    saveLocalOnLogout();
    toast.success('Logged out...');
  };

  return (
    <header className='header'>

      <div className='header-nav'>
        <nav>
          <ul className='nav-list'>

            <li>
              <LangSwitcher />
            </li>

            <li>
              <Link href='/'>{t('HEADER.MAIN')}</Link>
            </li>

            {!isLoggedIn && (
              <>

                <li>
                  <Link href='/signin'>{t('AUTH.LOG_IN')}</Link>
                </li>

                <li>
                  <Link href='/signup' >{t('AUTH.SIGN_UP')}</Link>
                </li>
              </>
            )}

            {isLoggedIn && (
              <>
                <li>
                  <Link href='/main'>{t('HEADER.BOARDS')}</Link>
                </li>

                <li>
                  <Link href='/profile'>{`${t('HEADER.PROFILE')} (${user?.name || user!.login})`}</Link>
                </li>

                <li>
                  <Link href='/' onClick={logOut}>{t('AUTH.SIGN_OUT')}</Link>
                </li>
              </>

            )}

          </ul>
        </nav>
      </div>

    </header>

  );
};
