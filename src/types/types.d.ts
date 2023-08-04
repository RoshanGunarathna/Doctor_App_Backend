export type userRoles =
  | "doctor"
  | "doctor's assistant"
  | "user"
  | "pharmacy"
  | "admin";

export interface UserInput {
  name: string;
  phoneNumber: string;
  nic: string;
  password: string;
}

export interface User extends UserInput {
  id: number;
  token: string;
}

export interface PatientInput {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
  nic: string;
}

export interface Patient extends PatientInput {
  id: number;
  token: string;
}
