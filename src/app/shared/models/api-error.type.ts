export type ApiErrorCode =
  | "INSUFFICIENT_FUNDS"
  | "INSUFFICIENT_ASSETS"
  | "INVALID_INPUT"
  | "PORTFOLIO_NOT_FOUND"
  | "ASSET_NOT_FOUND"
  | "INVALID_TRANSACTION"
  | "INTERNAL_ERROR";

export type ApiError = {
  error: {
    message: string;
    code: ApiErrorCode;
    details?: Record<string, unknown>;
  };
};
