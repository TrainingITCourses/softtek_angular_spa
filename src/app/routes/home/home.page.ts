import { JsonPipe } from '@angular/common';
import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { PageComponent } from '../../shared/page.component';
import { HomeStoreService } from './home.store.service';
import { IpApi } from './ip-api.type';

@Component({
  imports: [PageComponent, JsonPipe],
  template: `
  <app-page [title]="title()">
    <p>
      This is the home page.  
    </p>
    {{ ipApiStatus()  }}
    <pre>
      {{ ipApi() | json }}
    </pre>
  </app-page>
  `,
})
export default class HomePage {
  protected title: Signal<string> = signal('Home Page Title');
  private readonly homeStore= inject(HomeStoreService);
  protected ipApi: WritableSignal<IpApi | undefined> = this.homeStore.ipApi;
  protected ipApiStatus: Signal<string> = this.homeStore.ipApiStatus;

}
