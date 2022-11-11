import { Link } from '@tanstack/react-location';
import './Header.pcss';

const isLoggedIn = true;

export const Header = (): JSX.Element => (

  <header className="header">

    <Link to="/">
      <div className="header-logo">PMA</div>
    </Link>

    <div className='header-nav'>
      <nav >
        <ul className='nav-list'>

          {!isLoggedIn && (
            <>
              <li>
                <Link to="/signin">
                    Sign In
                </Link>
              </li>

              <li>
                <Link to="/signup">
                    Sign Up
                </Link>
              </li>
            </>
          )}

          {isLoggedIn && (
            <>
              <li>
                <Link to="/main">
                    Boards
                </Link>
              </li>
              <li>
                <Link to="/profile">
                    Boards
                </Link>
              </li>
              <li>
                <Link to="/signout">
                    Sign Out
                </Link>
              </li>
            </>

          )}

        </ul>
      </nav>
    </div>

  </header>

);
