import { computed, Injectable, signal } from "@angular/core";
import { DEFAULT_PORTFOLIO, Portfolio } from "./models/portfolio.type";

@Injectable({
  providedIn: "root",
})
export class PortfolioStore {
  private readonly portfolioState = signal<Portfolio>(DEFAULT_PORTFOLIO);

  public readonly portfolio = computed(() => this.portfolioState());
  public assetsValue = computed(() =>
    this.portfolio().assets.reduce(
      (acc, asset) => acc + asset.price * asset.quantity,
      0
    )
  );
  public netValue = computed(() => this.portfolio().cash + this.assetsValue());

  public updatePortfolio(portfolio: Portfolio): void {
    this.portfolioState.set(portfolio);
  }
}
