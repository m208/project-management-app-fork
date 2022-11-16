import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { API_ENDPOINT } from '@/app/constants';
import { IBoard } from '@/app/types';
import { RootState } from '@/store/store';

export const boardsApi = createApi({
  reducerPath: 'boardsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINT,

    prepareHeaders: (headers, { getState }) => {
      const  { token } = (getState() as RootState).authReducer;
      headers.set('Authorization', `Bearer ${token}`);
      headers.set('Accept', 'application/json');
      return headers;
    } }),

  tagTypes: ['Post'],

  endpoints: build => ({

    getAllBoards: build.query<IBoard[], void>({
      query: () => ({
        url: '/boards',
      }),
    }),

    createBoard: build.mutation<IBoard, IBoard>({
      query: board => ({
        url: '/boards',
        method: 'POST',
        body: board,
      }),
    }),

    deleteBoard: build.mutation<IBoard, string>({
      query: id => ({
        url: `/boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});
