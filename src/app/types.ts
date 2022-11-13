export type Languages = 'eng' | 'ru';

export interface IUser {
  name: string;
  login: string;
  id: string;
}

export interface IUserSignInData {
  login: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: IUser | null;
  token: string;
  awaiting?: boolean;
  logMessage?: string;
}
