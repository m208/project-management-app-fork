import { tokenExpirationValue } from './constants';
import { AuthState } from './types';

export const getLocalAuthState = () => {
  const token = localStorage.getItem('userToken');
  const lastAuthDate = localStorage.getItem('userAuthDate');
  const name = localStorage.getItem('userName');
  const login = localStorage.getItem('userLogin');

  const now = new Date().getTime();
  if (
    token &&
    lastAuthDate &&
    name &&
    login &&
    (now - +lastAuthDate < tokenExpirationValue )
  ){
    return {
      user: {
        name,
        login,
      },
      token,
    };
  }
  return {
    user: null,
    token,
  };
};

export const saveLocalAuthState = (auth: AuthState) => {
  if (auth.user){
    localStorage.setItem('userToken', auth.token);
    localStorage.setItem('userName', auth.user.name);
    localStorage.setItem('userLogin', auth.user.login);
    localStorage.setItem('userAuthDate', `${new Date().getTime()}`);
  }
};
