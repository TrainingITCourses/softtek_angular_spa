export type Asset = {
  id: string;
  name: string;
  category: AssetCategory;
  quantity: number;
  price: number;
  lastUpdated: Date;
};

export type AssetCategory = "stock" | "crypto";
