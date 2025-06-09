import { AssetType } from "../portfolio/asset.type";

export type TransactionType = "buy" | "sell";

export type Transaction = {
  id: string;
  portfolio_id: string;
  timestamp: Date;
  type: TransactionType;
  asset_type: AssetType;
  symbol: string;
  units: number;
  price_per_unit: number;
};

export const DEFAULT_TRANSACTION: Transaction = {
  id: "",
  portfolio_id: "",
  timestamp: new Date(),
  type: "buy",
  asset_type: "stock",
  symbol: "",
  units: 0,
  price_per_unit: 0,
};
