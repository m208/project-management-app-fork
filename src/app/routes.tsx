import {
  type Route,
} from '@tanstack/react-location';

import { Home } from '@/pages/Home/Home';
import { SignIn } from '@/pages/SignIn/SignIn';

export const routes: Route[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <Home />,
  },
  {
    path: '/main',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <Home />,
  },

];
