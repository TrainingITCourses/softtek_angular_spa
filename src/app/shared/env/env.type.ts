export type Env = {
  name: string;
  version: string;
  environment: "development" | "production";
};

export const defaultEnv: Env = {
  name: "App name",
  version: "0.0.1",
  environment: "development",
};
