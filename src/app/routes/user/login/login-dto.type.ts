export type LoginDto = {
  email: string;
  password: string;
};

export const defaultLoginDto: LoginDto = {
  email: "",
  password: "",
};
