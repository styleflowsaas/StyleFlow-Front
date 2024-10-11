export type InputLoginType = {
  email: string;
  password: string;
};

export type InputRegisterType = InputLoginType & {
  name: string;
  dni: string;
  passwordConfirm: string;
  startDate?: Date;
};
