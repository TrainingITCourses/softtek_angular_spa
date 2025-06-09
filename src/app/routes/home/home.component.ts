import { CurrencyPipe, DecimalPipe } from "@angular/common";
import { Component, computed, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Portfolio } from "../../shared/portfolio/portfolio.type";

@Component({
  selector: "app-home",
  imports: [CurrencyPipe, DecimalPipe, RouterLink],
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
        @if(hasAssets()){
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
        } @else {
        <p>No assets yet</p>
        }
        <a [routerLink]="['assets', 'buy']">Add new asset</a>
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
  protected hasAssets = computed(() => this.portfolio().assets.length > 0);
}
