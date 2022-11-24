import { useTranslation } from 'react-i18next';

import { useState } from 'react';

import { Task } from '../Task/Task';

import { tasksApi } from '@/api/services/TasksService';
import { IColumn, ITask } from '@/app/types';
import { Loader } from '@/components/Loader/Loader';
import './Column.pcss';
import { ModalData, ModalForm } from '@/components/ModalForm/ModalForm';

interface ColumnProps {
  column: IColumn;
  boardId: string;
  onDelete: (col: IColumn) => void;

}
export const Column = ({ boardId, column, onDelete }: ColumnProps): JSX.Element => {
  const [showModalCreateTask, setShowModalCreateTask] = useState(false);
  const [showModalEditTask, setShowModalEditTask] = useState(false);
  const [editedTask, setEditedTask] = useState<ITask | null>(null);

  const { data: tasks, isLoading } =
    tasksApi.useGetTasksQuery({ boardId, colId: column.id });

  const [createTask, { isLoading: crLoading }] = tasksApi.useCreateTaskMutation();
  const [deleteTask, { isLoading: delLoading }] = tasksApi.useDeleteTaskMutation();
  const [updateTask, { isLoading: editLoading }] = tasksApi.useUpdateTaskMutation();

  const { t } = useTranslation();

  const handleDeleteTask = async (task: ITask) => {
    await deleteTask({ task, boardId, colId: column.id });
  };

  const handleCreateTask =  () => {
    setShowModalCreateTask(true);
  };

  const handleEditTask = (task: ITask) => {
    setShowModalEditTask(true);
    setEditedTask(task);
  };

  const createNewTask = async (data: ModalData) => {
    setShowModalCreateTask(false);

    await createTask({
      colId: column.id,
      boardId,
      task: {
        title: data.title,
        order: 0,
        description: data.description,
        userId: 0,
        users: [''],
      } as ITask,
    });
  };

  const editTask = async (data: ModalData) => {
    setShowModalEditTask(false);

    if(editedTask ){
      await updateTask( {
        colId: column.id,
        boardId,
        task: {
          ...editedTask,
          title: data.title,
          description: data.description || '',
        },
      });
    }

    setEditedTask(null);
  };

  return (
    <section className="column-wrapper">

      {((isLoading || crLoading || delLoading || editLoading) && <Loader />)}

      {((showModalCreateTask) &&
      <ModalForm
        type ='CREATE_TASK'
        modalSubmit={createNewTask}
        modalAbort={()=>setShowModalCreateTask(false)}
      />)}

      {((showModalEditTask) &&
      <ModalForm
        type ='EDIT_TASK'
        modalSubmit={editTask}
        modalAbort={()=>setShowModalEditTask(false)}
        initialData={{ title: editedTask?.title || '', description: editedTask?.description }}
      />)}

      <div className="column">
        <h1 className="column-title">{column.title} (order: {column.order})</h1>

        <button
          type = 'button'
          className="column-del"
          onClick={()=>onDelete(column)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="board-del-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>

        <div className="column-body" >
          {tasks && tasks.map(task =>
            <Task
              task={task}
              onDelete={handleDeleteTask}
              onEdit={()=>handleEditTask(task)}
              key={task.id}
            />,
          )}
        </div>
        <div className="column-buttons col-bttn" >
          <button
            type='button'
            className="column-bttn"
            onClick={handleCreateTask}
          >
            {t('TASKS.ADD')}
          </button>
        </div>
      </div>

    </section>
  );
};
