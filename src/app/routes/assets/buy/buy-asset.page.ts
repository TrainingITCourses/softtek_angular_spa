import { Component, inject } from "@angular/core";
import { PageComponent } from "../../../shared/page.component";
import { CreateTransactionDto } from "../../../shared/portfolio/create-transaction.dto";
import { PortfolioStore } from "../../../shared/portfolio/portfolio.store";
import { ResourceComponent } from "../../../shared/resource.component";
import { BuyAssetFormComponent } from "./buy-asset.form";
import { BuyAssetService } from "./buy-asset.service";

@Component({
  providers: [BuyAssetService],
  imports: [BuyAssetFormComponent, PageComponent, ResourceComponent],
  template: ` <app-page title="Buy an asset">
    <app-buy-asset-form (buy)="onBuy($event)" />
    <app-resource [resource]="buyAssetService" />
  </app-page>`,
})
export default class BuyAssetPage {
  protected buyAssetService = inject(BuyAssetService);
  private portfolioStore = inject(PortfolioStore);

  protected onBuy(createTransactionDto: CreateTransactionDto) {
    const portfolioId = this.portfolioStore.portfolio().id;
    this.buyAssetService.buyAsset(portfolioId, createTransactionDto);
  }
}
