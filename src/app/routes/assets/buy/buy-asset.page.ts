import { Component, effect, inject } from "@angular/core";
import { PageComponent } from "../../../shared/page.component";
import { CreateTransactionDto } from "../../../shared/portfolio/create-transaction.dto";
import { LoadPortfolioService } from "../../../shared/portfolio/load-portfolio.service";
import { PortfolioStore } from "../../../shared/portfolio/portfolio.store";
import { ResourceComponent } from "../../../shared/resource.component";
import { BuyAssetFormComponent } from "./buy-asset.form";
import { BuyAssetService } from "./buy-asset.service";

@Component({
  providers: [BuyAssetService, LoadPortfolioService],
  imports: [BuyAssetFormComponent, PageComponent, ResourceComponent],
  template: ` <app-page title="Buy an asset">
    <app-buy-asset-form (buy)="onBuy($event)" />
    <app-resource [resource]="buyAssetService" />
  </app-page>`,
})
export default class BuyAssetPage {
  protected buyAssetService = inject(BuyAssetService);
  protected loadPortfolioService = inject(LoadPortfolioService);
  private portfolioStore = inject(PortfolioStore);

  protected onBuy(createTransactionDto: CreateTransactionDto) {
    const portfolioId = this.portfolioStore.portfolio().id;
    this.buyAssetService.buyAsset(portfolioId, createTransactionDto);
  }

  private onResolvedBuyEffect = effect(() => {
    const buyStatus = this.buyAssetService.status();
    if (buyStatus === "resolved") {
      this.loadPortfolioService.loadPortfolio();
    }
  });

  private onResolvedLoadEffect = effect(() => {
    const loadStatus = this.loadPortfolioService.status();
    if (loadStatus === "resolved") {
      const portfolio = this.loadPortfolioService.value();
      this.portfolioStore.setState(portfolio);
    }
  });
}
