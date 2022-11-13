export const getLocalAuthState = () => {
  const token = localStorage.getItem('token');
  const lastAuthDate = localStorage.getItem('authDate');
  const id = localStorage.getItem('userId');
  const name = localStorage.getItem('userName');
  const login = localStorage.getItem('userLogin');

  const now = new Date().getTime();
  if (
    token &&
    lastAuthDate &&
    id &&
    name &&
    login &&
    (now - +lastAuthDate <= 4 * 60 * 3600 )
    // TODO: Move token expiration value to constants (4 hours here)
  ){
    return {
      user: {
        id,
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
