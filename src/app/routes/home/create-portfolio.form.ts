import { Component, output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Portfolio } from "../../shared/portfolio/portfolio.type";

@Component({
  selector: "app-create-portfolio-form",
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <fieldset>
        <label for="initial_cash">Initial Cash</label>
        <input
          type="number"
          name="initial_cash"
          formControlName="initial_cash"
        />
        <label for="name">Name</label>
        <input type="text" name="name" formControlName="name" />
      </fieldset>
      <button type="button" (click)="createPortfolio()">Create</button>
    </form>
  `,
})
export class CreatePortfolioForm {
  protected form = new FormGroup({
    initial_cash: new FormControl(10000),
    name: new FormControl("My portfolio"),
  });
  public save = output<Portfolio>();
  protected createPortfolio(): void {
    this.save.emit(this.form.value as Portfolio);
  }
}
