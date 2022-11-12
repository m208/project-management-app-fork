import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '@/app/types';

interface AuthState {
  isLoggedIn: boolean;
  user: IUser | null;
  token: string;
}

const initialState: AuthState = {
  isLoggedIn: true,
  user: null,
  token: '',
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
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
