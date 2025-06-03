export type GlobalState = {
  user: string | undefined;
  theme: string;
  ip: string | undefined;
};

export const defaultGlobalState: GlobalState = {
  user: undefined,
  theme: "light",
  ip: undefined,
};
