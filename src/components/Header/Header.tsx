import { Link } from '@tanstack/react-location';
import Hamburger from 'hamburger-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { useState } from 'react';

import { LangSwitcher } from '../LangSwitcher/LangSwitcher';

import { saveLocalOnLogout } from '@/app/auth';
import appLogoPath from '@/assets/png/app-logo.png';
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
    toast.success(t('TOASTER.LOGGED_OUT'));
  };

  const appLogo = <img src={appLogoPath} alt="app-logo" className='header__app-logo' />;

  const [navClass, setNavClass] = useState('nav');
  const [overlayClass, setOverlayClass] = useState('overlay hidden');

  const onToggle = () => {
    if (navClass === 'nav') {
      setNavClass('nav_visible');
      setOverlayClass('overlay visible');
    } else {
      setNavClass('nav');
      setOverlayClass('overlay hidden');
    }
  };

  const onNavListClick = () => {
    setNavClass('nav');
    setOverlayClass('overlay hidden');
  };

  return (

    <header className='header'>
      <div className="container">
        <div className='header-wrapper'>
          <div className='app-logo'>
            <Link to='/'>
              {appLogo}
            </Link>
          </div>

          <nav className={navClass}>
            <ul className='nav-list' onClick={onNavListClick}>
              {!isLoggedIn && (
                <>
                  <li>
                    <Link to='/signin'>{t('AUTH.LOG_IN')}</Link>
                  </li>

                  <li>
                    <Link to='/signup' >{t('AUTH.SIGN_UP')}</Link>
                  </li>
                </>
              )}

              {isLoggedIn && (
                <>
                  <li>
                    <Link to='/boards'>{t('HEADER.BOARDS')}</Link>
                  </li>

                  <li>
                    <Link to='/profile'>{`${t('HEADER.PROFILE')} (${user?.name || user!.login})`}</Link>
                  </li>

                  <li>
                    <Link to='/' onClick={logOut}>{t('AUTH.SIGN_OUT')}</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <LangSwitcher />
          <Hamburger onToggle={onToggle} color="white" rounded />

          <div className={overlayClass} />

        </div>

      </div>
    </header>
  );
};
