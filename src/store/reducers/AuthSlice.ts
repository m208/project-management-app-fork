import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { ISignInResponse, userSignIn } from '@/api/apiAuth';
import { getLocalAuthState } from '@/app/auth';
import { IAuthState, IUserSignInData } from '@/app/types';

export const userLogIn = createAsyncThunk('user/login', async (userData: IUserSignInData, thunkAPI) => {
  try {
    return await userSignIn(userData);
  } catch (e) {
    return thunkAPI.rejectWithValue('Error loading data');
  }
});

const getInitalState: () => IAuthState = () => {
  const localData = getLocalAuthState();

  const initialState = {
    awaiting: false,
  };

  if (localData.user){
    return {
      ...initialState,
      isLoggedIn: true,
      user: localData.user,
      token: localData.token,
    };

  } return {
    ...initialState,
    isLoggedIn: false,
    user: null,
    token: '',
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

  extraReducers: builder => {
    builder
      .addCase(userLogIn.fulfilled, (state, action: PayloadAction<ISignInResponse>) => {
        if (action.payload.success){
          state.isLoggedIn = true;

          const { id, login, name, token } = action.payload.data!;
          state.token = token;
          state.user = { id, login, name };

          toast.success(`Welcome back, ${name || login}`);
        }
        else {
          toast.error(action.payload.errors!.message);
        }

        state.awaiting = false;
      })
      .addCase(userLogIn.pending, state => {
        state.awaiting = true;
      })

      .addCase(userLogIn.rejected, state => {
        state.awaiting = false;
        toast.error('Server error');
      });
  },

});

export default authSlice.reducer;
