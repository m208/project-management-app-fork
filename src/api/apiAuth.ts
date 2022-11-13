import { API_ENDPOINT } from '@/app/constants';
import { IUserSignInData } from '@/app/types';

export interface ISignInOk {
  token: string;
  id: string;
  name: string;
  login: string;
}

interface ISignInError {
  statusCode: string;
  message: string;
}

export interface ISignInResponse {
  success: boolean;
  data?: ISignInOk;
  errors?: ISignInError;

}

export async function userSignIn (userData: IUserSignInData){

  const url = `${API_ENDPOINT}/auth/signin`;
  const method = 'POST';
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify(userData);

  let answer: ISignInResponse;

  try {
    const response = await fetch(url, { method, headers, body });

    if (response.status === 200) {
      answer = {
        success: true,
        data: await response.json() as ISignInOk,
      };
    } else {
      answer = {
        success: false,
        errors: await response.json() as ISignInError,
      };
    }
  } catch (e) { throw new Error(); }

  return answer;

}
