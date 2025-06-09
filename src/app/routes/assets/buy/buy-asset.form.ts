import { Component, output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CreateTransactionDto } from "../../../shared/portfolio/create-transaction.dto";

@Component({
  selector: "app-buy-asset-form",
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <fieldset>
        <legend>Buy an Asset</legend>
        <label for="symbol">Symbol</label>
        <input type="text" formControlName="symbol" id="symbol" />
        <label for="price_per_unit">Price per unit</label>
        <input
          type="number"
          formControlName="price_per_unit"
          id="price_per_unit"
        />
        <label for="units">Units</label>
        <input type="number" formControlName="units" id="units" />
      </fieldset>
      <button type="submit" (click)="onSubmitClick()">Buy</button>
    </form>
  `,
})
export class BuyAssetFormComponent {
  protected readonly form = new FormGroup({
    symbol: new FormControl("AAPL", [Validators.required]),
    price_per_unit: new FormControl(150, [Validators.required]),
    units: new FormControl(100, [Validators.required]),
  });
  public buy = output<CreateTransactionDto>();
  public onSubmitClick(): void {
    const transaction: CreateTransactionDto = {
      ...(this.form.value as unknown as CreateTransactionDto),
      type: "buy",
      asset_type: "stock",
    };
    this.buy.emit(transaction);
  }
}
