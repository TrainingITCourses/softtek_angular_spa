export type Crypto = {
  id: string;
  name: string;
  symbol: string;
  kind: CryptoKind;
};

export type CryptoKind = "coin" | "token" | "stable";
