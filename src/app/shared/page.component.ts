import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-page',
  template: `
     <article>
      <header>
        <h1>
          {{ title() }}
        </h1>
      </header>
      <main>
        <ng-content />
      </main>
    </article>
  `,
})
export class PageComponent {
  public title: InputSignal<string> = input.required();
}
