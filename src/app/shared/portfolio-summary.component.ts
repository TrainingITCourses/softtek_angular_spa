import { CurrencyPipe } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { PortfolioStore } from "./portfolio.store";

@Component({
  selector: "app-portfolio-summary",
  imports: [CurrencyPipe],
  template: `{{ portfolioValue() | currency }}`,
})
export class PortfolioSummaryComponent {
  private readonly portfolioStore = inject(PortfolioStore);
  protected portfolioValue = computed(() => this.portfolioStore.netValue());
}
