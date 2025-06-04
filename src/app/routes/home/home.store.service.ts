import { httpResource } from "@angular/common/http";
import { effect, inject, Injectable } from "@angular/core";
import { Portfolio } from "../../shared/models/portfolio.type";
import { PortfolioStore } from "../../shared/portfolio.store";

@Injectable({
  providedIn: "root",
})
export class HomeStoreService {
  private readonly portfolioStore = inject(PortfolioStore);
  private readonly portfolioUrl = "http://localhost:3000/portfolio";

  public readonly portfolioResource = httpResource<Portfolio>(
    () => this.portfolioUrl
  );

  private onResourceValue = effect(() => {
    const portfolio = this.portfolioResource.value();
    if (portfolio) {
      this.portfolioStore.updatePortfolio(portfolio);
    }
  });
}
