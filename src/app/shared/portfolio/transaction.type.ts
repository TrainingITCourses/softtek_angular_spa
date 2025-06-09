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
