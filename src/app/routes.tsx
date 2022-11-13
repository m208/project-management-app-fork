import {
  Navigate,
  type Route,
} from '@tanstack/react-location';

import { Boards } from '@/pages/Boards/Boards';
import { Home } from '@/pages/Home/Home';
import { NonExistedPage } from '@/pages/NonExistedPage/NonExistedPage';
import { Profile } from '@/pages/Profile/Profile';
import { SignIn } from '@/pages/SignIn/SignIn';
import { SignUp } from '@/pages/SignUp/SignUp';

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
    element: <SignUp />,
  },
  {
    path: '/main',
    element: <Boards />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/404',
    element: <NonExistedPage />,
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },

];
