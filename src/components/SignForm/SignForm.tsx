import { useNavigate } from '@tanstack/react-location';
import { useForm } from 'react-hook-form';

import { useEffect, useRef } from 'react';

import { saveLocalAuthState } from '@/app/auth';
import { Loader } from '@/components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import './SignForm.pcss';
import { userLogIn, userLogUp } from '@/store/reducers/AuthThunks';

interface SignFormProps {
  type: 'signin' | 'signup';
}

export const SignForm = ({ type }: SignFormProps): JSX.Element => {

  const loginRef = useRef<string>('');
  const passwordRef = useRef<string>('');

  const { isLoggedIn, user, token, awaiting, userCreated } = useAppSelector(
    state => state.authReducer,
  );
  const dispatch = useAppDispatch();

  const dispathLogIn = async (login:string, password:string)=>{
    await dispatch(userLogIn({ login, password }));
  };

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: Record<string, string>) => {
    const { login, password, name } = data;

    if (type === 'signin') {
      dispathLogIn(login, password).catch(()=>{});

    } else if (type === 'signup'){
      [loginRef.current, passwordRef.current] = [login, password];
      await dispatch(userLogUp({ login, password, name }));
    }

  };

  useEffect(() => {
    if(userCreated){
      dispathLogIn(loginRef.current, passwordRef.current).catch(()=>{});
    }
  }, [userCreated]);

  useEffect(() => {
    if(isLoggedIn){
      saveLocalAuthState({ isLoggedIn, user, token });
      navigate({ to: '/main' });
    }
  }, [isLoggedIn]);

  return (
    <>
      {(awaiting && <Loader/> )}

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
          {type === 'signup' && (
            <div className="form-item">
              <label htmlFor='signin-name' className="form-item-label">
             Name:
                <input
                  id='signin-name'
                  className='signin-input'
                  {...register('name', { required: true })}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  type="text"
                />
              </label>

              <div className="error-field">
                {errors.name?.type === 'required' && (
                  <span role="alert">Enter login</span>
                )}
              </div>
            </div>
          )}

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
    </>
  );

};
