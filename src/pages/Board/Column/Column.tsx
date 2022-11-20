import { Task } from '../Task/Task';

import { tasksApi } from '@/api/services/TasksService';
import { IColumn, ITask } from '@/app/types';
import { Loader } from '@/components/Loader/Loader';
import './Column.pcss';

interface ColumnProps {
  column: IColumn;
  boardId: string;
  onDelete: (col: IColumn)=> void;

}
export const Column = ({ boardId, column, onDelete }: ColumnProps): JSX.Element => {

  const { data: tasks,  isLoading } =
    tasksApi.useGetTasksQuery({ boardId, colId: column.id });

  const [createTask, { isLoading: crLoading }] = tasksApi.useCreateTaskMutation();
  const [deleteTask, { isLoading: delLoading }] = tasksApi.useDeleteTaskMutation();

  const handleDeleteTask = async (task: ITask) => {
    await deleteTask({ task, boardId, colId: column.id });
  };

  const handleCreateTask = async () => {
    // eslint-disable-next-line no-alert
    const taskTitle = prompt('Input new task title');

    if (taskTitle) {
      await createTask({
        colId: column.id,
        boardId,
        task: {
          title: taskTitle,
          order: 0,
          description: 'string',
          userId: 0,
          users: [
            'string',
          ],
        } as ITask,
      });
    }

  };

  return (
    <section className="column-wrapper">
      {((isLoading || crLoading || delLoading ) && <Loader/> )}

      <div className="column">
        <h1>{column.title} (order: {column.order})</h1>

        <div className="column-body" >
          {tasks && tasks.map(task =>
            <Task
              task = {task}
              //   boardId = {boardId}
              //   colId = {column.id}
              onDelete={handleDeleteTask}
              key = {task.id}
            />,
          )}
        </div>
        <div className="column-buttons col-bttn" >
          <button
            type = 'button'
            className="column-bttn"
            onClick={handleCreateTask}
          >
                ADD TASK
          </button>
          <button
            type = 'button'
            className="column-bttn"
            onClick={()=>onDelete(column)}
          >
                DEL COLUMN
          </button>
        </div>
      </div>

    </section>
  );};
