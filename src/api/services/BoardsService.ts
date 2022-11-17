import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { API_ENDPOINT } from '@/app/constants';
import { IBoard, IBoardResponse } from '@/app/types';
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

  tagTypes: ['Boards'],

  endpoints: build => ({

    getAllBoards: build.query<IBoard[], void>({
      query: () => ({
        url: '/boards',
      }),
      transformResponse:( response:IBoardResponse[]) => response.map(board=>{
        const { owner, title, users, _id: id } = board;
        return { owner, title, users, id };
      }),

      providesTags: () => ['Boards'],
    }),

    createBoard: build.mutation<IBoard, IBoard>({
      query: board => ({
        url: '/boards',
        method: 'POST',
        body: board,
      }),
      invalidatesTags: ['Boards'],
    }),

    updateBoard: build.mutation<IBoard, IBoard>({
      query: board => ({
        url: `/boards/${board.id}`,
        method: 'PUT',
        body: { title: board.title, owner: board.owner, users: board.users },
      }),
      invalidatesTags: ['Boards'],
    }),

    deleteBoard: build.mutation<IBoard, string>({
      query: id => ({
        url: `/boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Boards'],
    }),
  }),
});
