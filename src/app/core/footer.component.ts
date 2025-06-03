import { Component, inject } from "@angular/core";
import { ENV } from "../shared/env/env.token";
import { Env } from "../shared/env/env.type";

@Component({
  selector: "app-footer",
  imports: [],
  template: `
    <footer>
      <small>
        &copy; {{ year }} by
        <a class="secondary" href="{{ env.author.url }}">{{
          env.author.name
        }}</a>
        . All rights reserved.
        <i
          >Based on
          <a href="{{ env.repository }}">{{ env.name }} {{ env.version }}</a></i
        >
      </small>
    </footer>
  `,
  styles: ``,
})
export class FooterComponent {
  protected env: Env = inject(ENV);
  protected year: number = new Date().getFullYear();
}
