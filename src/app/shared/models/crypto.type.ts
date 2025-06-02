export type Crypto = {
  id: string;
  symbol: string;
  name: string;
  kind: CryptoKind;
};

export type CryptoKind = "coin" | "token" | "stable";
