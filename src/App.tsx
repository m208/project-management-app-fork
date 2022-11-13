import {
  Outlet,
  ReactLocation,
  Router,
} from '@tanstack/react-location';
import { Toaster } from 'react-hot-toast';

import { routes } from './app/routes';

import './App.pcss';

import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';

const location = new ReactLocation();

export const App = (): JSX.Element => (
  <>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <Header />

    <main className='content'>
      <Router location={location} routes={routes}>
        <Outlet />
      </Router>
    </main>

    <Footer />
  </>
);
