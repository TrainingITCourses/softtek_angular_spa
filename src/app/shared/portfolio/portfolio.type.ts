import { Asset } from "../portfolio/asset.type";

export type Portfolio = {
  id: string;
  user_id: string;
  name: string;
  initial_cash: number;
  cash: number;
  assets: Asset[];
  lastUpdated: string;
};

export const DEFAULT_PORTFOLIO: Portfolio = {
  id: "",
  user_id: "",
  name: "",
  initial_cash: 0,
  cash: 0,
  assets: [],
  lastUpdated: new Date().toISOString(),
};
