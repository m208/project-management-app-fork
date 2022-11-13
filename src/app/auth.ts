import { tokenExpirationValue } from './constants';
import { AuthState } from './types';

export const getLocalAuthState = () => {
  const token = localStorage.getItem('userToken');
  const lastAuthDate = localStorage.getItem('userAuthDate');
  const name = localStorage.getItem('userName');
  const login = localStorage.getItem('userLogin');
  const id = localStorage.getItem('userId');

  const now = new Date().getTime();
  if (
    token &&
    lastAuthDate &&
    name &&
    login &&
    id &&
    (now - +lastAuthDate < tokenExpirationValue )
  ){
    return {
      user: {
        name,
        login,
        id,
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
    localStorage.setItem('userId', auth.user.id);
    localStorage.setItem('userAuthDate', `${new Date().getTime()}`);
  }
};

export const saveLocalOnLogout = () =>{
  const items = ['userToken', 'userName', 'userLogin', 'userId', 'userAuthDate'];
  items.map(item=>localStorage.removeItem(item));
};
