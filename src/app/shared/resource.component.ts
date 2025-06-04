import {
  Component,
  computed,
  input,
  InputSignal,
  ResourceRef,
} from "@angular/core";
import { ErrorComponent } from "./error.component";
import { WaitingComponent } from "./waiting.component";

@Component({
  selector: "app-resource",
  imports: [WaitingComponent, ErrorComponent],
  template: `
    @switch (status()) {
      @case ("loading") {
        <app-waiting />
      }
      @case ("error") {
        <app-error />
      }
      @case ("resolved") {
        <ng-content />
      }
    }
  `,
})
export class ResourceComponent {
  public resource: InputSignal<ResourceRef<any>> =
    input.required<ResourceRef<any>>();
  public status = computed(() => this.resource().status());
}
