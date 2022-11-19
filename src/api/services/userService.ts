/* eslint-disable import/no-cycle */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_ENDPOINT } from '@/app/constants';
import { ITransformUser, IUser, IUserSignUpData } from '@/app/types';
import { RootState } from '@/store/store';

const transformUserProps = (response: IUser) => {
  const { _id: id, name, login } = response;
  return { id, name, login };
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINT,

    prepareHeaders: (headers, { getState }) => {
      const  { token } = (getState() as RootState).authReducer;
      headers.set('Authorization', `Bearer ${token}`);
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Users'],
  endpoints: build => ({
    getUser: build.query<ITransformUser, string>({
      query: id => ({
        url: `/users/${id}`,
      }),
      transformResponse: transformUserProps,
    }),
    updateUser: build.mutation<IUser, { id: string; userData: IUserSignUpData}>({
      query: ({ id, userData }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['Users'],
    }),
    removeUser: build.mutation<IUser, string>({
      query: user => ({
        url: `/users/${user}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});
