import { Link, useNavigate } from '@tanstack/react-location';
import { useForm } from 'react-hook-form';

import { useEffect, useRef } from 'react';

import { signFormLabelsMap, SignFormTypes } from './SignFormLabels';

import { saveLocalAuthState } from '@/app/auth';
import { Loader } from '@/components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import './SignForm.pcss';
import { userLogIn, userLogUp } from '@/store/reducers/AuthThunks';

interface SignFormProps {
  type: SignFormTypes;
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

      <div className='signform-wrapper'>
        <form className="signform" onSubmit={(handleSubmit(onSubmit))}>

          <div className="signform-item">
            <h2 className="signform-header">{signFormLabelsMap[type].heading}</h2>
          </div>

          <div className="signform-item">

            <input
              placeholder='Email:'

              className='signform-input'
              {...register('login', { required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '',
                },
              })}
              aria-invalid={errors.login ? 'true' : 'false'}
              type="mail"
            />

            <div className="error-field">
              {errors.login?.type === 'required' && (
                <span role="alert">Enter login</span>
              )}
              {errors.login?.type === 'pattern' && (
                <span role="alert">Invalid email address</span>
              )}
            </div>
          </div>

          {type === 'signup' && (
            <div className="signform-item">

              <input
                placeholder='Name:'
                className='signform-input'
                {...register('name', { required: true,  minLength: 3 })}
                aria-invalid={errors.name ? 'true' : 'false'}
                type="text"
              />

              <div className="error-field">
                {errors.name?.type === 'required' && (
                  <span role="alert">Enter name</span>
                )}
                {errors.name?.type === 'minLength' && (
                  <span role="alert">At least 3 characters</span>
                )}
              </div>
            </div>
          )}

          <div className="signform-item">

            <input
              placeholder='Password:'
              className='signform-input'
              {...register('password', {
                required: true,
                minLength: (type === 'signup'? 8 : undefined),
              })}
              aria-invalid={errors.password ? 'true' : 'false'}
              type="password"
            />

            <div className="error-field">
              {errors.password?.type === 'required' && (
                <span role="alert">Enter password</span>
              )}
              {errors.password?.type === 'minLength' && (
                <span role="alert">At least 8 characters</span>
              )}
            </div>
          </div>

          <div className="signform-item">
            <input
              type="submit"
              className='signform-button'
              value={signFormLabelsMap[type].submit.toUpperCase()}/>
          </div>

          <div className="signform-item">
            <p className="signform-footer">
              {signFormLabelsMap[type].bottomText}
              <span className="signform-footer-link">
                <Link to = {signFormLabelsMap[type].link} >
                  {signFormLabelsMap[type].bottomLink.toUpperCase()}
                </Link>
              </span>
            </p>
          </div>

        </form>
      </div>
    </>
  );

};
