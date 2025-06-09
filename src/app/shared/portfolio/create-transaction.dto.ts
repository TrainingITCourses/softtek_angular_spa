import type { AssetType } from "../portfolio/asset.type";
import { TransactionType } from "./transaction.type";

export type CreateTransactionDto = {
  type: TransactionType;
  asset_type: AssetType;
  symbol: string;
  units: number;
  price_per_unit: number;
};
