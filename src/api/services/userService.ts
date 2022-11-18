import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_ENDPOINT } from '@/app/constants';
import { IUser, IUserSignUpData } from '@/app/types';
import { RootState } from '@/store/store';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINT,
  }),
  tagTypes: ['Users'],
  endpoints: (build) => ({
    getUser: build.query<string, IUser>({
      query: (id) => ({
        url: `/users/${id}`,
      }),
    }),
    updateUser: build.mutation<IUser, IUserSignUpData>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: 'PUT',
        body: { name: user.name, login: user.login, password: user.password },
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: build.mutation<IUser, string>({
      query: (user) => ({
        url: `/users/${user}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});
