import { Asset } from "./asset.type";

export type Portfolio = {
  id: string;
  userId: string;
  cash: number;
  assets: Asset[];
  lastUpdated: Date;
};

export const DEFAULT_PORTFOLIO: Portfolio = {
  id: "",
  userId: "",
  cash: 0,
  assets: [],
  lastUpdated: new Date(),
};
