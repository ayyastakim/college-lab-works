import { TRole } from "@/interface/IUser";

export type TLoginForm = {
  email: string;
  password: string;
  role?: TRole;
};

export type TSingUpForm = {
  email: string;
  password: string;
  name: string;
};

export type TForgotPassword = {
  email: string;
};
