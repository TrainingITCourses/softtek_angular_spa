import { Component } from "@angular/core";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-footer",
  imports: [],
  template: `
    <footer>
      <small>
        &copy; {{ year }} by {{ env.APP_AUTHOR }}. All rights reserved.
      </small>
    </footer>
  `,
  styles: ``,
})
export class FooterComponent {
  protected year: number = new Date().getFullYear();
  protected env = environment;
}
