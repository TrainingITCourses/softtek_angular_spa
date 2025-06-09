import { Component, computed, inject } from "@angular/core";
import { PageComponent } from "../../shared/page.component";
import { PortfolioStore } from "../../shared/portfolio/portfolio.store";
import { ResourceComponent } from "../../shared/resource.component";
import { HomeComponent } from "./home.component";
import { HomeStoreService } from "./home.store.service";

@Component({
  imports: [PageComponent, ResourceComponent, HomeComponent],
  template: `
    <app-page title="Your Portfolio">
      <app-resource [resource]="portfolioResource">
        <app-home
          [portfolio]="portfolio()"
          [netValue]="netValue()"
          [assetsValue]="assetsValue()"
        />
      </app-resource>
      <footer>
        <p>Last updated: {{ lastUpdated() }}</p>
      </footer>
    </app-page>
  `,
})
export default class HomePage {
  private readonly homeStore = inject(HomeStoreService);
  private readonly portfolioStore = inject(PortfolioStore);
  protected portfolioResource = this.homeStore.portfolioResource;
  protected portfolio = this.portfolioStore.portfolio;
  protected netValue = this.portfolioStore.netValue;
  protected assetsValue = this.portfolioStore.assetsValue;
  protected lastUpdated = computed(() => this.portfolio().lastUpdated);
}
