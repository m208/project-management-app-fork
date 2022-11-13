import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ISignInResponse, userSignIn } from '@/api/apiAuth';
import { getLocalAuthState } from '@/app/auth';
import { AuthState, IUserSignInData } from '@/app/types';

export const userLogIn = createAsyncThunk('user/login', async (userData: IUserSignInData, thunkAPI) => {
  try {
    return await userSignIn(userData);
  } catch (e) {
    return thunkAPI.rejectWithValue('Error loading data');
  }
});

const getInitalState: () => AuthState = () => {
  const localData = getLocalAuthState();

  if (localData.user){
    return {
      isLoggedIn: true,
      user: localData.user,
      token: localData.token,
      awaiting: false,
    };

  } return {
    isLoggedIn: false,
    user: null,
    token: '',
    awaiting: false,
  };

};

export const authSlice = createSlice({
  name: 'authentication',
  initialState: getInitalState(),

  reducers: {
    logOff (state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = '';
    },
  },

  extraReducers: {
    [userLogIn.fulfilled.type]: (state, action: PayloadAction<ISignInResponse>) => {
      if (action.payload.success){
        state.isLoggedIn = true;
        state.token = action.payload.data!.token;
      }
      state.awaiting = false;
    },

    [userLogIn.pending.type]: state => {
      state.awaiting = true;
    },

    [userLogIn.rejected.type]: (state  /* , action: PayloadAction<string> */) => {
      state.isLoggedIn = false;
      // console.log(action.payload);
    },
  },
});

export default authSlice.reducer;
