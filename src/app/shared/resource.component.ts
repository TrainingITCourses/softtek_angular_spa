import {
  Component,
  computed,
  input,
  InputSignal,
  Resource,
} from "@angular/core";
import { ErrorComponent } from "./error.component";
import { WaitingComponent } from "./waiting.component";

@Component({
  selector: "app-resource",
  imports: [WaitingComponent, ErrorComponent],
  template: `
    @if (resource().isLoading()) {
    <app-waiting />
    } @else if (resource().error()) {
    <app-error [message]="errorMessage()" />
    } @else {
    <ng-content />
    }
  `,
})
export class ResourceComponent {
  public resource: InputSignal<Resource<any>> = input.required<Resource<any>>();
  protected status = computed(() => this.resource().status());
  protected errorMessage = computed(() => {
    const error = this.resource().error();
    if (error && error.message) {
      return error.message;
    }
    return "Unknown error";
  });
}
