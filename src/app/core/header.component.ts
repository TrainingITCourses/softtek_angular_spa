import { Component, computed, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { GlobalStore } from "../shared/global/global.store";
import { ThemeToggleComponent } from "./theme-toggle.component";

@Component({
  selector: "app-header",
  imports: [ThemeToggleComponent, RouterLink],
  template: `
    <header>
      <nav>
        <ul>
          <a [routerLink]="['']">Home</a>
        </ul>
        <ul>
          @if(isLoggedIn()){
          <li>
            <a [routerLink]="['user', userId()]">User</a>
          </li>
          }@else{
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
})
export class HeaderComponent {
  private globalStore = inject(GlobalStore);
  protected isLoggedIn = computed(() => this.userId() !== undefined);
  protected userId = this.globalStore.user;
}
