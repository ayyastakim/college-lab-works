export type TRole = "user" | "admin";

export interface IUser {
  uid: string;
  name: string;
  email: string;
  role: TRole;
  photoURL: string | null;
  emailVerified: boolean;

  createdAt: string;
  updatedAt: string;
  password: string;
  phone: string;
}
