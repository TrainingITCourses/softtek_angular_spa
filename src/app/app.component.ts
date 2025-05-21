import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header.component';
import { LogService } from './shared/log/log.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header />
    <router-outlet />
  `,
})
export class AppComponent {
  private readonly logService: LogService = inject(LogService);
  constructor( ) {
    this.logService.info('AppComponent constructor');
  }
}
