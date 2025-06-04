import { JsonPipe, KeyValuePipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-form-errors",
  imports: [KeyValuePipe, JsonPipe],
  template: `
    <section>
      @if (form().invalid) {
        <p>Review the form for errors:</p>
        @for (control of form().controls | keyvalue; track control.key) {
          <ul>
            @let errors = control.value.errors;
            @if (errors) {
              <li>
                {{ control.key }}
                <p>{{ errors | json }}</p>
              </li>
            }
          </ul>
        } @empty {
          <p>No errors</p>
        }
      }
    </section>
  `,
})
export class FormErrorsComponent {
  public form = input.required<FormGroup>();
}
