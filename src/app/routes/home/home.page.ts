import { Component, computed, effect, inject } from "@angular/core";
import { PageComponent } from "../../shared/page.component";
import { PortfolioStore } from "../../shared/portfolio/portfolio.store";
import { Portfolio } from "../../shared/portfolio/portfolio.type";
import { ResourceComponent } from "../../shared/resource.component";
import { CreatePortfolioForm } from "./create-portfolio.form";
import { CreatePortfolioService } from "./create-portfolio.service";
import { HomeComponent } from "./home.component";
import { HomeStoreService } from "./home.store.service";

@Component({
  providers: [CreatePortfolioService],
  imports: [
    PageComponent,
    ResourceComponent,
    HomeComponent,
    CreatePortfolioForm,
  ],
  template: `
    <app-page title="Your Portfolio">
      <app-resource [resource]="portfolioResource">
        @if(gotPortfolio()){
        <app-home
          [portfolio]="portfolio()"
          [netValue]="netValue()"
          [assetsValue]="assetsValue()"
        />
        }@else {
        <app-create-portfolio-form (save)="onSavePortfolio($event)" />
        Status: {{ createPortfolioStatus() }} Error:
        {{ createPortfolioError() }}
        }
      </app-resource>
      <footer>
        <p>Last updated: {{ lastUpdated() }}</p>
      </footer>
    </app-page>
  `,
})
export default class HomePage {
  private readonly homeStore = inject(HomeStoreService);
  private createPortfolioService = inject(CreatePortfolioService);
  private readonly portfolioStore = inject(PortfolioStore);
  protected portfolioResource = this.homeStore.portfolioResource;
  protected portfolio = this.portfolioStore.portfolio;
  protected netValue = this.portfolioStore.netValue;
  protected assetsValue = this.portfolioStore.assetsValue;
  protected lastUpdated = computed(() => this.portfolio().lastUpdated);
  protected gotPortfolio = computed(() => this.portfolio().id !== "");

  protected onSavePortfolio(portfolio: Portfolio) {
    console.log("saving", portfolio);
    // post request
    this.createPortfolioService.createPortfolio(portfolio);
  }
  protected createPortfolioStatus = computed(() =>
    this.createPortfolioService.status()
  );
  protected createPortfolioError = computed(
    () => this.createPortfolioService.error()?.message || ""
  );

  private onCreatePortfolioResolved = effect(() => {
    const status = this.createPortfolioStatus();
    if (status == "resolved") {
      const portfolio = this.createPortfolioService.value();
      this.portfolioStore.setState(portfolio);
    }
  });
}
