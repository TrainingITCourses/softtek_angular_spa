import { Component, computed, effect, inject } from "@angular/core";
import { PageComponent } from "../../shared/page.component";
import { LoadPortfolioService } from "../../shared/portfolio/load-portfolio.service";
import { PortfolioStore } from "../../shared/portfolio/portfolio.store";
import { Portfolio } from "../../shared/portfolio/portfolio.type";
import { ResourceComponent } from "../../shared/resource.component";
import { CreatePortfolioForm } from "./create-portfolio.form";
import { CreatePortfolioService } from "./create-portfolio.service";
import { HomeComponent } from "./home.component";

@Component({
  providers: [CreatePortfolioService, LoadPortfolioService],
  imports: [PageComponent, ResourceComponent, HomeComponent, CreatePortfolioForm],
  template: `
    <app-page title="Your Portfolio">
      <app-resource [resource]="portfolioResource">
        @if(gotPortfolio()){
        <app-home [portfolio]="portfolio()" [netValue]="netValue()" [assetsValue]="assetsValue()" />
        }@else {
        <app-create-portfolio-form (save)="onSavePortfolio($event)" />
        }
      </app-resource>
      <footer>
        <p>Last updated: {{ lastUpdated() }}</p>
      </footer>
    </app-page>
  `,
})
export default class HomePage {
  private readonly loadPortfolioService = inject(LoadPortfolioService);
  private readonly createPortfolioService = inject(CreatePortfolioService);
  private readonly portfolioStore = inject(PortfolioStore);

  protected portfolioResource = this.loadPortfolioService.portfolioResource;
  protected portfolio = this.portfolioStore.portfolio;
  protected netValue = this.portfolioStore.netValue;
  protected assetsValue = this.portfolioStore.assetsValue;
  protected lastUpdated = computed(() => this.portfolio().lastUpdated);
  protected gotPortfolio = computed(() => this.portfolio().id !== "");

  private onCreatePortfolioResolved = effect(() => {
    if (this.createPortfolioService.status() === "resolved") {
      this.createPortfolioService.status.set("idle");
      this.loadPortfolioService.loadPortfolio();
    }
  });
  private onLoadPortfolioResolved = effect(() => {
    if (this.loadPortfolioService.status() === "resolved") {
      this.portfolioStore.setState(this.loadPortfolioService.value());
    }
  });

  protected onSavePortfolio(portfolio: Portfolio) {
    this.createPortfolioService.createPortfolio(portfolio);
  }
}
