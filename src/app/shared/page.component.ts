import { Component, input, InputSignal } from "@angular/core";

@Component({
  selector: "app-page",
  template: `
    <section>
      <header>
        <h1>
          {{ title() }}
        </h1>
      </header>
      <main>
        <ng-content />
      </main>
      <ng-content select="footer" />
    </section>
  `,
})
export class PageComponent {
  public title: InputSignal<string> = input.required<string>();
}
