import { Component } from "@angular/core";
import { ThemeToggleComponent } from "./theme-toggle.component";

@Component({
  selector: "app-header",
  imports: [ThemeToggleComponent],
  template: `
    <header>
      <nav>
        <ul>
          <li>
            <app-theme-toggle />
          </li>
        </ul>
      </nav>
    </header>
  `,
})
export class HeaderComponent {}
