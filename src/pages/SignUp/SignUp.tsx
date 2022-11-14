import { SignForm } from '@/components/SignForm/SignForm';
import './SignUp.pcss';

export const SignUp = (): JSX.Element => (
  <section className='auth'>
    <p className='auth-heading'>Sign Up</p>
    <SignForm type = 'signup'/>
  </section>
);
