import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/AuthSlice';
import langReducer from './reducers/LanguageSlice';

import { boardsApi } from '@/api/services/BoardsService';
import { columnsApi } from '@/api/services/ColumnsService';

export const rootReducer = combineReducers({
  langReducer,
  authReducer,
  [boardsApi.reducerPath]: boardsApi.reducer,
  [columnsApi.reducerPath]: columnsApi.reducer,
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(boardsApi.middleware)
      .concat(columnsApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
