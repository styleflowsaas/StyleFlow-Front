export type InputLoginType = {
  dni?: string | number;
  email?: string;
  password: string;
};
//! Corregir tipos cuando el backend arregle
export type InputRegisterType = InputLoginType & {
  name: string;
  email: string;
  dni?: string | number;
  passwordConfirm: string;
  startDate?: Date;
};
