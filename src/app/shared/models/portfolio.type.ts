import { Asset } from "./asset.type";

export type Portfolio = {
  id: string;
  userId: string;
  cash: number;
  assets: Asset[];
  lastUpdated: Date;
};
