import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import './ModalForm.pcss';

export type ModalFormTypes = 'CREATE_COLUMN' | 'CREATE_BOARD' | 'EDIT_BOARD' | 'CREATE_TASK' | 'EDIT_TASK';

interface ModalFormProps {
  type: ModalFormTypes;
  callback: (v: string) => void;
}

export const ModalForm = ({ type, callback }: ModalFormProps): JSX.Element => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = () => callback('111');

  return (
    <div className='modalform-wrapper'>
      <form className="modalform" onSubmit={(handleSubmit(onSubmit))}>

        <div className="modalform-item">
          <h2 className="modalform-header">{t(`${type}.HEADING`)}</h2>
        </div>

        <div className="modalform-item">

          <input
            type="text"
            placeholder={(t(`${type}.NAME`)).toString()}
            className='modalform-input'
            {...register('name', { required: true })}
            aria-invalid={errors.name ? 'true' : 'false'}
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
            value={t(`${type}.SUBMIT`).toString().toUpperCase() }/>
        </div>

      </form>
    </div>
  );
};
