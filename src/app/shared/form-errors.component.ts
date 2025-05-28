import { JsonPipe, KeyValuePipe } from "@angular/common";
import { Component, input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-form-errors",
  imports: [KeyValuePipe, JsonPipe],
  template: `
    @if(form().invalid){
    <section>
      @for(controlKV of form().controls | keyvalue; track controlKV.key){
      <ul>
        @let errors = controlKV.value.errors;
        <hr />
        @if(errors){
        <li>
          {{ controlKV.key }}
          :
          {{ errors | json }}
        </li>
        }
      </ul>
      } @empty {
      <p>No controls</p>
      }
    </section>
    } @else {
    <p>Todo ok</p>
    }
  `,
})
export class FormErrorsComponent {
  public form = input.required<FormGroup>();
}
