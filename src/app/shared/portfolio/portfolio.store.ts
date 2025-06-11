import { computed, Injectable, signal } from "@angular/core";
import { DEFAULT_PORTFOLIO, Portfolio } from "./portfolio.type";

@Injectable({
  providedIn: "root",
})
export class PortfolioStore {
  private readonly state = signal<Portfolio>(DEFAULT_PORTFOLIO);

  public setState(portfolio: Portfolio): void {
    this.state.set(portfolio);
  }

  public readonly portfolio = computed(() => this.state());

  public assetsValue = computed(() =>
    this.portfolio().assets.reduce((acc, asset) => acc + asset.last_price * asset.units, 0)
  );

  public netValue = computed(() => this.portfolio().cash + this.assetsValue());

  public cash = computed(() => this.portfolio().cash);
}
