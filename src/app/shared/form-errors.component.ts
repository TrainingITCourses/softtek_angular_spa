import { JsonPipe, KeyValuePipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-form-errors",
  imports: [KeyValuePipe, JsonPipe],
  template: ` @if (form().invalid) {
    <p>Review the form for errors:</p>
    @for (control of form().controls | keyvalue; track control.key) {
      @let errors = control.value.errors;
      @if (errors) {
        <p>{{ control.key }}: {{ errors | json }}</p>
      }
    } @empty {
      <p>No errors</p>
    }
  }`,
})
export class FormErrorsComponent {
  public form = input.required<FormGroup>();
}
