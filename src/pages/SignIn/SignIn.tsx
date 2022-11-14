import { SignForm } from '@/components/SignForm/SignForm';
import './SignIn.pcss';

export const SignIn = (): JSX.Element => (
  <section className='auth'>
    <p className='auth-heading'>Sign In</p>
    <SignForm type = 'signin'/>
  </section>
);
