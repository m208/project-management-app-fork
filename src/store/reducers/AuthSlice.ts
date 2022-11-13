import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getLocalAuthState } from '@/app/auth';
import { AuthState, IUser } from '@/app/types';

const getInitalState: () => AuthState = () => {
  const localData = getLocalAuthState();

  if (localData.user){
    return {
      isLoggedIn: true,
      user: localData.user,
      token: localData.token,
    };

  } return {
    isLoggedIn: false,
    user: null,
    token: '',
  };

};

export const authSlice = createSlice({
  name: 'authentication',
  initialState: getInitalState(),
  reducers: {
    logIn (state, action: PayloadAction<IUser>) {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.token = '';
    },
    logOff (state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = '';
    },
  },
});

export default authSlice.reducer;
