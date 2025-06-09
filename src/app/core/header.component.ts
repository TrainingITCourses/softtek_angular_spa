import { Component, computed, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ENV } from "../shared/env/env.token";
import { Env } from "../shared/env/env.type";
import { GlobalStore } from "../shared/global/global.store";

import { PortfolioSummaryComponent } from "../shared/portfolio/portfolio-summary.component";
import { ThemeToggleComponent } from "./theme-toggle.component";

@Component({
  selector: "app-header",
  imports: [ThemeToggleComponent, RouterLink, PortfolioSummaryComponent],
  template: `
    <header>
      <nav>
        <ul>
          <li>
            <a [routerLink]="['']"><strong>Assets Board</strong></a>
          </li>
        </ul>
        <ul>
          @if (isLoggedIn()) {
          <li>
            <a [routerLink]="['user', user()]">User</a>
          </li>
          <li>
            <app-portfolio-summary />
          </li>
          } @else {
          <li>
            <a [routerLink]="['user', 'register']">Register</a>
          </li>
          }
          <li>
            <app-theme-toggle />
          </li>
        </ul>
      </nav>
    </header>
  `,
  styles: ``,
})
export class HeaderComponent {
  protected env: Env = inject(ENV);
  private globalStore = inject(GlobalStore);
  protected isLoggedIn = computed(() => !!this.globalStore.user());
  protected user = this.globalStore.user;
}
