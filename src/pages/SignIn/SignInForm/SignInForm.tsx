import { useNavigate } from '@tanstack/react-location';
import { FieldValues, useForm } from 'react-hook-form';
import './SignInForm.pcss';

interface SignInFormData {
  login: string;
  password: string;
}

export const SignInForm = (): JSX.Element => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    const { login, password } = data;
    navigate({ to: '/main' });
  };

  return (
    <div className='signin-form-wrapper'>
      <form className="form" onSubmit={(handleSubmit(onSubmit))}>

        <div className="form-item">
          <label htmlFor='signin-login' className="form-item-label">
             Login:

            <input
              id='signin-login'
              className='signin-input'
              {...register('login', { required: true })}
              aria-invalid={errors.login ? 'true' : 'false'}
              type="text"
            />
          </label>

          <div className="error-field">
            {errors.password?.type === 'required' && (
              <span role="alert">Enter login</span>
            )}
          </div>
        </div>

        <div className="form-item">
          <label htmlFor='signin-password' className="form-item-label">
             Password:

            <input
              id='signin-password'
              className='signin-input'
              {...register('password', { required: true })}
              aria-invalid={errors.password ? 'true' : 'false'}
              type="text"
            />
          </label>
          <div className="error-field">
            {errors.password?.type === 'required' && (
              <span role="alert">Enter password</span>
            )}
          </div>
        </div>

        <div className="form-submit-wrapper">
          <input type="submit" className='submit-button' value="Sign in!"/>
        </div>
      </form>
    </div>
  );

};
