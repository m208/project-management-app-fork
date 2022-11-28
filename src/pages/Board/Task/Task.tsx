import { useState } from 'react';

import {  ITask } from '@/app/types';
import Confirmation from '@/components/Confirmation/Confirmation';

import './Task.pcss';

interface TaskProps {
  task: ITask;
  onDelete: (task: ITask)=> void;
  onEdit: (task: ITask)=> void;

}
export const Task = ({ task, onDelete, onEdit }: TaskProps): JSX.Element => {
/*  delete confirmation  */
  const [showConfirmation, setShowConfirmation ] = useState(false);
  const onClickDeleteHandle = () => {
    setShowConfirmation(true);
  };

  return (
    <>
      {(showConfirmation) && <Confirmation componentName="TASK" deleteFunc={() => onDelete(task)} hideConfirmFunc={setShowConfirmation}/>}

      <div className="task-wrapper">
        <div className="task-inner">
          <div className="task-content">
            {task.title}
          </div>
          <div className="task-buttons">
            <button
              type ='button'
              className="task-bttn"
              onClick={()=>onEdit(task)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" className="task-button-icon">
                <path fillRule="evenodd" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" clipRule="evenodd" />/
              </svg>
            </button>

            <button
              type ='button'
              className="task-bttn"
              onClick={onClickDeleteHandle}
              // onClick={()=>onDelete(task)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="task-button-icon">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </>
  );
};
