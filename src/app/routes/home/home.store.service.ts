import { httpResource } from "@angular/common/http";
import { computed, effect, inject, Injectable } from "@angular/core";
import { PortfolioStore } from "../../shared/portfolio/portfolio.store";
import {
  DEFAULT_PORTFOLIO,
  Portfolio,
} from "../../shared/portfolio/portfolio.type";

@Injectable({
  providedIn: "root",
})
export class HomeStoreService {
  private readonly portfolioStore = inject(PortfolioStore);
  private readonly portfolioUrl = "http://localhost:3000/portfolios";

  public value = computed(() => {
    return this.portfolioResource.value()?.[0] ?? DEFAULT_PORTFOLIO;
  });
  public readonly portfolioResource = httpResource<Portfolio[]>(
    () => this.portfolioUrl
  );

  private onResourceValue = effect(() => {
    const resourceStatus = this.portfolioResource.status();
    if (resourceStatus == "resolved") {
      this.portfolioStore.setState(this.value());
    }
  });
}
