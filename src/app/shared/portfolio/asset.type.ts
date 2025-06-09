export type AssetType = "stock" | "crypto" | "bond";

export type Asset = {
  asset_type: AssetType;
  symbol: string;
  units: number;
  average_price: number;
  lastUpdated: Date;
};
