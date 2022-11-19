import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/AuthSlice';
import langReducer from './reducers/LanguageSlice';

import { boardsApi } from '@/api/services/BoardsService';
import { userApi } from '@/api/services/userService';

export const rootReducer = combineReducers({
  langReducer,
  authReducer,
  [boardsApi.reducerPath]: boardsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(boardsApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
