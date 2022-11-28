import { useTranslation } from 'react-i18next';

import React, { Dispatch, SetStateAction } from 'react';

import './Confirmation.pcss';

interface ConfirmationProps {
  componentName: string;
  deleteFunc: () => void;
  hideConfirmFunc: Dispatch<SetStateAction<boolean>>;
}

const Confirmation = ({ componentName, deleteFunc, hideConfirmFunc }: ConfirmationProps) => {
  const { t } = useTranslation();

  return (
    <div className='confirm-overlay'>
      <div className="confirm-dialog">
        <p className="confirm-question">{t('CONFIRM.QUESTION')} {t(`CONFIRM.${componentName}`)}?</p>
        <div className="confirm-buttons">
          <button type='button' className='confirm-btn del-btn' onClick={deleteFunc}>{t('CONFIRM.DELETE')}</button>
          <button type='button' className='confirm-btn cancel-btn' onClick={() => hideConfirmFunc(false)}>{t('CONFIRM.CANCEL')}</button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
