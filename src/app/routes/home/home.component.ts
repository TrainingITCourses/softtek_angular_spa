import { CurrencyPipe, DecimalPipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { Portfolio } from "../../shared/portfolio/portfolio.type";

@Component({
  selector: "app-home",
  imports: [CurrencyPipe, DecimalPipe],
  template: `
    <article>
      <header>
        <dl>
          <dt>Net Value</dt>
          <dd>{{ netValue() | currency }}</dd>
          <dt>Cash</dt>
          <dd>{{ portfolio().cash | currency }}</dd>
          <dt>Assets Value</dt>
          <dd>{{ assetsValue() | currency }}</dd>
        </dl>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th style="text-align: right">Quantity</th>
              <th style="text-align: right">Price</th>
              <th style="text-align: right">Value</th>
            </tr>
          </thead>
          <tbody>
            @for (asset of portfolio().assets; track asset.symbol) {
            <tr>
              <td>{{ asset.symbol }}</td>
              <td style="text-align: right">
                {{ asset.units | number : "1.2-2" }}
              </td>
              <td style="text-align: right">
                {{ asset.average_price | currency }}
              </td>
              <td style="text-align: right">
                {{ asset.average_price * asset.units | currency }}
              </td>
            </tr>
            }
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">Total</td>
              <td style="text-align: right">
                {{ assetsValue() | currency }}
              </td>
            </tr>
          </tfoot>
        </table>
      </main>
    </article>
  `,
})
export class HomeComponent {
  // private readonly portfolioStore = inject(PortfolioStore);
  // protected portfolio = this.portfolioStore.portfolio;
  // protected assetsValue = this.portfolioStore.assetsValue;
  // protected netValue = this.portfolioStore.netValue;
  public portfolio = input.required<Portfolio>();
  public assetsValue = input.required<number>();
  public netValue = input.required<number>();
}
