import { SignForm } from '@/components/SignForm/SignForm';
import './SignUp.pcss';

export const SignUp = (): JSX.Element => (
  <section className='auth'>
    <SignForm type = 'signup'/>
  </section>
);
