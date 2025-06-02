export type Stock = {
  id: string;
  symbol: string;
  name: string;
  industry: StockIndustry;
};

export type StockIndustry =
  | "Technology"
  | "Automotive"
  | "Retail"
  | "Telecom"
  | "Entertainment"
  | "Food"
  | "Biotechnology";
