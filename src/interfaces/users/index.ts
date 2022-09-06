export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  is_adm?: boolean;
  is_pro_user?: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}
