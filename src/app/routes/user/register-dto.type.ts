export type RegisterDto = {
  name: string;
  email: string;
  password: string;
};

export const defaultRegisterDto: RegisterDto = {
  name: "",
  email: "",
  password: "",
};
