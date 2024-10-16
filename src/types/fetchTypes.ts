export type InputLoginType = {
  dni: string | number;
  password: string;
};

export type InputRegisterType = InputLoginType & {
  name: string;
  email: string;
  dni: string | number;
  passwordConfirm: string;
  startDate?: Date;
};
