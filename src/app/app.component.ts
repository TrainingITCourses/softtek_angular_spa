import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header.component';
import { LogService } from './shared/log/log.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header />
    <h1>Welcome to {{ title }}!</h1>
    <router-outlet />
  `,
})
export class AppComponent {
  protected title = 'softtek-angular-spa';
  private readonly logService: LogService = inject(LogService);
  constructor( ) {
    this.logService.info('AppComponent constructor');
  }
}
