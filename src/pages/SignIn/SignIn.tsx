import './SignIn.pcss';
import { SignInForm } from './SignInForm/SignInForm';

export const SignIn = (): JSX.Element => (
  <section className='auth'>
    <p className='auth-heading'>Log In Form Here</p>
    <SignInForm />
  </section>
);
