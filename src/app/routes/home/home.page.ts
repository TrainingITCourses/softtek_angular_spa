import { Component, computed, inject } from "@angular/core";
import { PageComponent } from "../../shared/page.component";
import { ResourceComponent } from "../../shared/resource.component";
import { HomeComponent } from "./home.component";
import { HomeStoreService } from "./home.store.service";

@Component({
  imports: [PageComponent, ResourceComponent, HomeComponent],
  template: `
    <app-page title="Your Portfolio">
      <app-resource [resource]="portfolioResource">
        <app-home></app-home>
      </app-resource>
      <footer>
        <p>Last updated: {{ lastUpdated() }}</p>
      </footer>
    </app-page>
  `,
})
export default class HomePage {
  private readonly homeStore = inject(HomeStoreService);
  protected portfolioResource = this.homeStore.portfolioResource;
  protected lastUpdated = computed(
    () => this.portfolioResource.value()?.lastUpdated
  );
}
