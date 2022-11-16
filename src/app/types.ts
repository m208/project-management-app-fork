export type Languages = 'eng' | 'ru';

export interface IUser {
  name: string;
  login: string;
  _id: string;
}

export type IUserSignInData = Omit <IUserSignUpData, 'name'>;

export interface IUserSignUpData {
  login: string;
  name: string;
  password: string;
}

export interface IAuthState {
  isLoggedIn: boolean;
  user: IUser | null;
  token: string;
  awaiting?: boolean;
  userCreated?: boolean;
}

export interface IBoard {
  id?: string;
  _id?: string;
  title: string;
  owner: string;
  users: Array<string>;
}
