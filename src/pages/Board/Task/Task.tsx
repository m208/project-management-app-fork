import {  ITask } from '@/app/types';
import './Task.pcss';
import CloseLogo from '@/assets/png/close-logo.png';

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
        <img className="w-4 h-4" src={CloseLogo} alt="Close" />
      </button>
    </div>
  </div>
);
