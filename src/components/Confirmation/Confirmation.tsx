import React, { Dispatch, SetStateAction } from 'react';
import './Confirmation.pcss';

interface ConfirmationProps {
  text: string;
  deleteFunc: () => void;
  hideConfirmFunc: Dispatch<SetStateAction<boolean>>;
}

const Confirmation = ({ text, deleteFunc, hideConfirmFunc }: ConfirmationProps) => (
  <div className='confirm-overlay'>
    <div className="confirm-dialog">
      <p className="confirm-quastion">Do you really want to delete this {text}?</p>
      <div className="confirm-buttons">
        <button type='button' className='confirm-btn del-btn' onClick={deleteFunc}>Delete</button>
        <button type='button' className='confirm-btn cancel-btn' onClick={() => hideConfirmFunc(false)}>Cancel</button>
      </div>
    </div>
  </div>
);

export default Confirmation;
