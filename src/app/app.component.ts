import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "./core/footer.component";
import { HeaderComponent } from "./core/header.component";
import { LogService } from "./shared/log/log.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header />
    <router-outlet />
    <app-footer />
  `,
})
export class AppComponent {
  private readonly logService: LogService = inject(LogService);
  constructor() {
    this.logService.info("AppComponent constructor");
  }
}
