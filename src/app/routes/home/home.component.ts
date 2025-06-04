import { CurrencyPipe, DecimalPipe } from "@angular/common";
import { Component, computed, input } from "@angular/core";
import { Portfolio } from "../../shared/models/portfolio.type";
@Component({
  selector: "app-home",
  imports: [CurrencyPipe, DecimalPipe],
  template: `
    <article>
      <header>
        <h3>Net Value: {{ netValue() | currency }}</h3>
        <p>Cash: {{ portfolio().cash | currency }}</p>
        <p>Assets Value: {{ assetsValue() | currency }}</p>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            @for (asset of portfolio().assets; track asset.id) {
              <tr>
                <td>{{ asset.name }}</td>
                <td>{{ asset.quantity | number: "1.2-2" }}</td>
                <td>{{ asset.price | currency }}</td>
              </tr>
            }
          </tbody>
        </table>
      </main>
    </article>
  `,
})
export class HomeComponent {
  public portfolio = input.required<Portfolio>();
  public assetsValue = computed(() =>
    this.portfolio().assets.reduce((acc, asset) => acc + asset.price, 0)
  );
  public netValue = computed(() => this.portfolio().cash + this.assetsValue());
}
