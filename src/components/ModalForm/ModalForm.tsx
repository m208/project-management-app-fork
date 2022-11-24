import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import './ModalForm.pcss';

export type ModalFormTypes = 'CREATE_COLUMN' | 'CREATE_BOARD' | 'EDIT_BOARD' | 'CREATE_TASK' | 'EDIT_TASK';

interface ModalFormProps {
  type: ModalFormTypes;
  modalSubmit: (data: ModalData) => void;
  modalAbort: () => void;
  initialData?: ModalData;
}

export interface ModalData {
  title: string;
  description?: string;
}
export const ModalForm = ({
  type, modalSubmit, modalAbort, initialData,
}: ModalFormProps): JSX.Element => {

  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: Record<string, string>) => {
    const { description, title } = data;
    modalSubmit({ description, title });
  };

  return (
    <div className='modal-wrapper'>
      <div className="modal-inner">
        <div className="modal-close">
          <button
            type='button'
            className="modal-close-bttn"
            onClick={modalAbort}
          >X</button>
        </div>

        <form className="modalform" onSubmit={(handleSubmit(onSubmit))}>
          <h2 className="modalform-header">{t(`${type}.HEADING`)}</h2>

          <div className="modalform-item">
            <input
              type="text"
              placeholder={(t(`${type}.NAME`)).toString()}
              className='modalform-input'
              {...register('title', { required: true })}
              aria-invalid={errors.name ? 'true' : 'false'}
              defaultValue={initialData?.title}
            />

            <div className="error-field">
              {errors.name?.type === 'required' && (
                <span role="alert">{(t(`${type}.REQUIRED_NAME`))}</span>
              )}
            </div>
          </div>

          <div className="modalform-item">

            <textarea
              placeholder={t(`${type}.DESCRIPTION`).toString() }
              className='modalform-input'
              cols={60} rows={5}
              {...register('description', {
                required: false,
              })}
              aria-invalid={errors.password ? 'true' : 'false'}
              defaultValue={initialData?.description}
            />

            <div className="error-field">
              {errors.password?.type === 'required' && (
                <span role="alert">{(t(`${type}.REQUIRED_DESCRIPTION`))}</span>
              )}
            </div>
          </div>

          <div className="modalform-item">
            <input
              type="submit"
              className='modalform-button'
              value={t(`${type}.SUBMIT`).toString().toUpperCase()}/>
          </div>

        </form>
      </div>

    </div>
  );
};
