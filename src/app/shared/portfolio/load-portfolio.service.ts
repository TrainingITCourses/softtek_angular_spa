import { httpResource } from "@angular/common/http";
import {
  effect,
  Injectable,
  Resource,
  ResourceStatus,
  signal,
  Signal,
  WritableSignal,
} from "@angular/core";
import { CryptoRate } from "./crypto-rate.type";
import { DEFAULT_PORTFOLIO, Portfolio } from "./portfolio.type";
import { StockPrice } from "./stock-price.type";

@Injectable()
export class LoadPortfolioService implements Resource<Portfolio> {
  private readonly portfolioUrl = "http://localhost:3000/portfolios";
  public readonly portfolioResource = httpResource<Portfolio[]>(
    () => this.portfolioUrl
  );

  public value: WritableSignal<Portfolio> = signal(DEFAULT_PORTFOLIO);
  public status: Signal<ResourceStatus> = this.portfolioResource.status;
  public error: Signal<Error | undefined> = this.portfolioResource.error;
  public isLoading: Signal<boolean> = this.portfolioResource.isLoading;
  public hasValue = (): this is Resource<Portfolio> => true;

  public loadPortfolio() {
    this.portfolioResource.reload();
  }

  private onLoadPortfolioResolved = effect(async () => {
    if (this.portfolioResource.status() !== "resolved") return;
    if (!this.portfolioResource.value()) return;
    const portfolio = this.portfolioResource.value()?.[0];
    if (!portfolio || portfolio.assets.length == 0) return;
    const updatedAssetPrices = await Promise.all(
      portfolio.assets.map(async (asset) => {
        let url = "http://localhost:3000";
        if (asset.asset_type === "stock") {
          url = url + "/stocks/" + asset.symbol + "/price";
        } else {
          url = url + "/cryptos/" + asset.symbol + "/rate";
        }
        const request = await fetch(url);
        const data = await request.json();
        const lastPrice =
          asset.asset_type === "stock"
            ? (data as StockPrice).price
            : (data as CryptoRate).dollar;
        return { ...asset, last_price: lastPrice };
      })
    );
    portfolio.assets = updatedAssetPrices;
    console.log(portfolio);
    this.value.set(portfolio);
  });
}
