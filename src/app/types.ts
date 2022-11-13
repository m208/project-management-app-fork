export type Languages = 'eng' | 'ru';

export interface IUser {
  name: string;
  login: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: IUser | null;
  token: string;
}
