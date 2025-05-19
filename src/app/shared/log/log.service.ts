import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  debug(message: string): void {
    console.debug(message);
  }

  info(message: string): void {
    console.log(message);
  }
}
