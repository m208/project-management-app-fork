import {  ITask } from '@/app/types';
import './Task.pcss';

interface TaskProps {
  task: ITask;
  //   boardId?: string;
  //   colId?: string;
  onDelete: (task: ITask)=> void;

}
export const Task = ({ task, onDelete }: TaskProps): JSX.Element => (
  <div className="task-wrapper">
    <div className="task-content">
      {task.title}
    </div>
    <div className="task-buttons">
      <button
        type ='button'
        className="task-delbttn"
        onClick={()=>onDelete(task)}
      >
            X
      </button>
    </div>
  </div>
);
