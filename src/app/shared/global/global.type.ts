export type GlobalState = {
  user: string | undefined;
  token: string | undefined;
  theme: string;
  ip: string | undefined;
};

export const defaultGlobalState: GlobalState = {
  user: undefined,
  token: undefined,
  theme: "light",
  ip: undefined,
};
