import { useNavigate } from '@tanstack/react-location';
import { useForm } from 'react-hook-form';

import { useEffect, useRef } from 'react';

import { signFormLabelsMap, SignFormTypes } from './SignFormLabels';

import { Link } from '../Link/Link';

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
              placeholder='Login:'

              className='signform-input'
              {...register('login', { required: true })}
              aria-invalid={errors.login ? 'true' : 'false'}
              type="text"
            />

            <div className="error-field">
              {errors.login?.type === 'required' && (
                <span role="alert">Enter login</span>
              )}
            </div>
          </div>

          {type === 'signup' && (
            <div className="signform-item">

              <input
                placeholder='Name:'
                className='signform-input'
                {...register('name', { required: true })}
                aria-invalid={errors.name ? 'true' : 'false'}
                type="text"
              />

              <div className="error-field">
                {errors.name?.type === 'required' && (
                  <span role="alert">Enter name</span>
                )}
              </div>
            </div>
          )}

          <div className="signform-item">

            <input
              placeholder='Password:'
              className='signform-input'
              {...register('password', { required: true })}
              aria-invalid={errors.password ? 'true' : 'false'}
              type="text"
            />

            <div className="error-field">
              {errors.password?.type === 'required' && (
                <span role="alert">Enter password</span>
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
              <Link
                className='signform-footer-link'
                href={signFormLabelsMap[type].link}
                text={signFormLabelsMap[type].bottomLink.toUpperCase()}
              />
            </p>
          </div>
        </form>
      </div>
    </>
  );

};
