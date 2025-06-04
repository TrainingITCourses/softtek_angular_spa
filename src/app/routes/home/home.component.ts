import { CurrencyPipe, DecimalPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { PortfolioStore } from "../../shared/portfolio.store";
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
            </tr>
          </thead>
          <tbody>
            @for (asset of portfolio().assets; track asset.id) {
              <tr>
                <td>{{ asset.name }}</td>
                <td style="text-align: right">
                  {{ asset.quantity | number: "1.2-2" }}
                </td>
                <td style="text-align: right">
                  {{ asset.price | currency }}
                </td>
              </tr>
            }
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2">Total</td>
              <td style="text-align: right">
                {{ netValue() | currency }}
              </td>
            </tr>
          </tfoot>
        </table>
      </main>
    </article>
  `,
})
export class HomeComponent {
  private readonly portfolioStore = inject(PortfolioStore);
  protected portfolio = this.portfolioStore.portfolio;
  protected assetsValue = this.portfolioStore.assetsValue;
  protected netValue = this.portfolioStore.netValue;
}
