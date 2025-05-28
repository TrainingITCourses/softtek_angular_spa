import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { APP_NAME } from "../app-name.token";

@Injectable({
  providedIn: "root",
})
export class LogService {
  appName = inject(APP_NAME);
  private http = inject(HttpClient);

  debug(message: string): void {
    console.debug(this.appName + " : " + message);
  }

  info(message: string): void {
    console.log(this.appName + " : " + message);
  }

  warn(message: string): void {
    this.http
      .post("http://localhost:3000", { message, level: "warning" })
      .subscribe();
  }
}
