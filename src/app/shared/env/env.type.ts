export type Env = {
  name: string;
  version: string;
  repository: string;
  author: {
    name: string;
    email: string;
    url: string;
  };
};

export const defaultEnv: Env = {
  name: "App name",
  version: "0.0.1",
  repository: "https://github.com/AIcodeAcademy/ArchetypeAngularSPA",
  author: {
    name: "AlbertoBasalo",
    email: "AlbertoBasalo@AIcode.academy",
    url: "https://albertobasalo.dev",
  },
};
