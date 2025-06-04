import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "./core/footer.component";
import { HeaderComponent } from "./core/header.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    <router-outlet />
    <app-footer />
  `,
  styles: [],
})
export class AppComponent {
  protected title: string = "c0-angular-spa";
}
