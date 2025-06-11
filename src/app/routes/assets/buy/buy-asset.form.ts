import {
  Component,
  computed,
  inject,
  linkedSignal,
  model,
  ModelSignal,
  output,
  Signal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AssetType } from "../../../shared/portfolio/asset.type";
import { CreateTransactionDto } from "../../../shared/portfolio/create-transaction.dto";
import { LoadSymbolPriceService } from "./load-symbol-price.service";
import { LoadSymbolsService } from "./load-symbols.service";

@Component({
  selector: "app-buy-asset-form",
  providers: [LoadSymbolsService, LoadSymbolPriceService],
  imports: [FormsModule],
  template: `
    <form>
      <fieldset>
        <legend>Buy an Asset</legend>
        <section>
          <label for="asset_type">Asset Type to buy</label>
          <input
            type="radio"
            name="asset_type"
            id="stock"
            value="stock"
            [(ngModel)]="assetType"
          />
          <label for="stock"> Stock </label>
          <input
            type="radio"
            name="asset_type"
            id="crypto"
            value="crypto"
            [(ngModel)]="assetType"
          />
          <label htmlFor="crypto"> Crypto </label>
        </section>
        <label for="symbol">Symbol</label>
        <select [(ngModel)]="symbol" name="symbol">
          @for(anySymbol of symbols(); track anySymbol.symbol){
          <option [value]="anySymbol.symbol">
            {{ anySymbol.name }}
          </option>
          }
        </select>
        <label for="price_per_unit">Price per unit</label>
        <input
          type="number"
          [value]="pricePerUnit()"
          id="price_per_unit"
          readonly
        />
        <label for="units">Units</label>
        <input type="number" [(ngModel)]="units" name="units" id="units" />
      </fieldset>
      <button type="submit" (click)="onSubmitClick()">Buy</button>
    </form>
  `,
})
export class BuyAssetFormComponent {
  public buy = output<CreateTransactionDto>();

  private loadSymbolsService = inject(LoadSymbolsService);
  private loadSymbolPriceService = inject(LoadSymbolPriceService);

  protected assetType: ModelSignal<AssetType> = model<AssetType>("stock");

  protected symbols = this.loadSymbolsService.value;
  private firstSymbol = computed(() => this.symbols()[0]?.symbol);
  protected symbol = linkedSignal<string>(() => this.firstSymbol() ?? "");
  protected pricePerUnit: Signal<number> = this.loadSymbolPriceService.value;
  protected units: ModelSignal<number> = model(1);

  constructor() {
    this.loadSymbolsService.assetType = this.assetType;
    this.loadSymbolPriceService.assetType = this.assetType;
    this.loadSymbolPriceService.symbol = this.symbol;
  }

  public onSubmitClick(): void {
    const transaction: CreateTransactionDto = {
      type: "buy",
      asset_type: this.assetType(),
      symbol: this.symbol(),
      units: this.units(),
      price_per_unit: this.pricePerUnit(),
    };
    console.log(transaction);
    this.units.set(1);
    this.symbol.set(this.firstSymbol());
    // this.buy.emit(transaction);
  }
}
