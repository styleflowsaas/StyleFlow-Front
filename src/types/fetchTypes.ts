export type InputLoginType = {
  email: string;
  password: string;
};

export type InputRegisterType = InputLoginType & {
  name: string;
  dni: string | number;
  passwordConfirm: string;
  startDate?: Date;
};
