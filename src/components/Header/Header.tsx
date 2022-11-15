import toast from 'react-hot-toast';

import { LangSwitcher } from '../LangSwitcher/LangSwitcher';
import { Link } from '../Link/Link';

import { saveLocalOnLogout } from '@/app/auth';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { authSlice } from '@/store/reducers/AuthSlice';

import appLogoPath from '@/assets/png/app-logo.png';

import './Header.pcss';

export const Header = (): JSX.Element => {
  const { isLoggedIn, user } = useAppSelector(state => state.authReducer);
  const { logOff } = authSlice.actions;
  const dispatch = useAppDispatch();

  const logOut = () =>{
    dispatch(logOff());
    saveLocalOnLogout();
    toast.success('Logged out...');
  };

  const appLogo = <img src={appLogoPath} alt="app-logo" className='header__app-logo' />;

  return (

    <header className='header'>
      <div className="container">
        <div className='header-wrapper'>
          <div className='app-logo'>
            <Link
              href='/'
              children={appLogo}
            />
          </div>

          <nav className='nav'>
            <ul className='nav-list'>
              {!isLoggedIn && (
                <>

                  <li>
                    <Link
                      href='/signin'
                      text='Log In'
                    />
                  </li>

                  <li>
                    <Link
                      href='/signup'
                      text='Sign Up'
                    />
                  </li>
                </>
              )}

              {isLoggedIn && (
                <>
                  <li>
                    <Link
                      href='/main'
                      text='Boards'
                    />

                  </li>

                  <li>
                    <Link
                      href='/profile'
                      text={`Profile (${user?.name || user!.login})`}
                    />
                  </li>

                  <li>
                    <Link
                      href='/'
                      text='Sign Out'
                      onClick={logOut}
                    />
                  </li>
                </>

              )}

            </ul>
          </nav>
          
          <LangSwitcher />
        </div>
      </div>
    </header>

  );
};
