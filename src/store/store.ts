import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/AuthSlice';
import langReducer from './reducers/LanguageSlice';

const rootReducer = combineReducers({
  langReducer,
  authReducer,
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
