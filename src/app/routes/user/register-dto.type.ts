export type RegisterDto = {
  email: string;
  password: string;
};

export const defaultRegisterDto: RegisterDto = {
  email: "",
  password: "",
};
