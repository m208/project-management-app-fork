import { useNavigate } from '@tanstack/react-location';
import { useForm } from 'react-hook-form';

import { useEffect } from 'react';

import { saveLocalAuthState } from '@/app/auth';
import { IUserSignInData } from '@/app/types';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import './SignInForm.pcss';
import { userLogIn } from '@/store/reducers/AuthSlice';

export const SignInForm = (): JSX.Element => {
  const { isLoggedIn, user, token } = useAppSelector(
    state => state.authReducer,
  );
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: Record<string, string>) => {

    const userData: IUserSignInData = {
      login: data.login,
      password: data.password,
    };

    dispatch(userLogIn(userData))
      .catch(()=>{});
  };

  useEffect(() => {
    if(isLoggedIn){
      saveLocalAuthState({ isLoggedIn, user, token });
      navigate({ to: '/main' });
    }
  }, [isLoggedIn]);

  return (
    <div className='signin-form-wrapper'>
      <p>Logged:{isLoggedIn.toString()}</p>
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
