import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { generateHeaders } from './prepareHeaders';

import { API_ENDPOINT } from '@/app/constants';
import { ITask, ITaskResponse } from '@/app/types';

const normTasksId = (response: ITaskResponse ) => {
  const { title, boardId, order, columnId, description, userId, users, _id: id } = response;
  return { title, boardId, order, columnId, description, userId, users, id };
};

const normTasksArrayId =  (response: ITaskResponse[]) =>
  response.map(task=>normTasksId(task));

export const tasksApi = createApi({
  reducerPath: 'tasksApi',

  baseQuery: fetchBaseQuery({
    baseUrl: API_ENDPOINT,
    prepareHeaders: generateHeaders,
  }),

  tagTypes: ['Tasks'],

  endpoints: build => ({

    getTasks: build.query<ITask[], {boardId: string; colId: string}>({
      query: data => ({
        url: `/boards/${data.boardId}/columns/${data.colId}/tasks`,
      }),
      transformResponse: normTasksArrayId,
      providesTags: () => ['Tasks'],
    }),

    createTask: build.mutation<ITask, {task: ITask; colId: string; boardId: string }>({
      query: data => ({
        url: `/boards/${data.boardId}/columns/${data.colId}/tasks`,
        method: 'POST',
        body: data.task,
      }),
      invalidatesTags: ['Tasks'],
    }),

    updateTask: build.mutation<ITask, {task: ITask; colId: string; boardId: string }>({
      query: data => ({
        url: `/boards/${data.boardId}/columns/${data.colId}/tasks/${data.task.id}`,
        method: 'PUT',
        body: {
          title: data.task.title,
          order: data.task.order,
          description: data.task.description,
          columnId: data.task.columnId,
          userId: data.task.userId,
          users: data.task.users,
        },
      }),
      invalidatesTags: ['Tasks'],
    }),

    deleteTask: build.mutation<ITask, {task: ITask; colId: string; boardId: string}>({
      query: data => ({
        url: `/boards/${data.boardId}/columns/${data.colId}/tasks/${data.task.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),

  }),
});
