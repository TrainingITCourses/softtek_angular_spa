import { Component, computed, inject, Signal, signal } from "@angular/core";
import { ENV } from "../../shared/env/env.token";
import type { Env } from "../../shared/env/env.type";
import { PageComponent } from "../../shared/page.component";
import { ResourceComponent } from "../../shared/resource.component";
import { HomeComponent } from "./home.component";
import { HomeStoreService } from "./home.store.service";

@Component({
  imports: [PageComponent, ResourceComponent, HomeComponent],
  template: `
    <app-page [title]="title()">
      <h2>Your Portfolio</h2>
      <app-resource [resource]="portfolioResource">
        <app-home [portfolio]="portfolioResource.value()!"></app-home>
      </app-resource>
      <footer>
        <p>Last updated: {{ lastUpdated() }}</p>
      </footer>
    </app-page>
  `,
})
export default class HomePage {
  private readonly homeStore = inject(HomeStoreService);
  private readonly env: Env = inject(ENV);
  protected title: Signal<string> = signal(this.env.name);
  protected portfolioResource = this.homeStore.portfolioResource;
  protected lastUpdated = computed(
    () => this.portfolioResource.value()?.lastUpdated
  );
}
