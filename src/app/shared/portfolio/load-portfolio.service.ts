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
import { Asset, AssetType } from "./asset.type";
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
        const response = await fetch(this.buildUrl(asset));
        const last_price = await this.extractLastPrice(
          response,
          asset.asset_type
        );
        return { ...asset, last_price };
      })
    );

    portfolio.assets = updatedAssetPrices;
    this.value.set(portfolio);
  });

  private buildUrl(asset: Asset) {
    let url = "http://localhost:3000";
    if (asset.asset_type === "stock") {
      url = url + "/stocks/" + asset.symbol + "/price";
    } else {
      url = url + "/cryptos/" + asset.symbol + "/rate";
    }
    return url;
  }

  private async extractLastPrice(response: Response, assetType: AssetType) {
    const data = await response.json();
    const lastPrice =
      assetType === "stock"
        ? (data as StockPrice).price
        : (data as CryptoRate).dollar;
    return lastPrice;
  }
}
