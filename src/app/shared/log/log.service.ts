import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENV } from "../env/env.token";
import { Env } from "../env/env.type";
import { GlobalStore } from "../global/global.store";
import { LogEntryDTO } from "./log-entry-dto.type";

@Injectable({
  providedIn: "root",
})
export class LogService {
  // ToDo: add emoji based on log level

  private http: HttpClient = inject(HttpClient);
  private env: Env = inject(ENV);
  private globalStore = inject(GlobalStore);

  public debug(message: string): void {
    console.debug(`🔍 - ${message}`);
    this.sendLog(this.buildLogEntry(message, "debug"));
  }
  public info(message: string): void {
    console.log(`💬 - ${message}`);
    this.sendLog(this.buildLogEntry(message, "info"));
  }
  public warn(message: string): void {
    console.warn(`⚠️ - ${message}`);
    this.sendLog(this.buildLogEntry(message, "warn"));
  }
  public error(message: string): void {
    console.error(`❌ - ${message}`);
    this.sendLog(this.buildLogEntry(message, "error"));
  }
  private buildLogEntry(message: string, level: string): LogEntryDTO {
    return {
      message,
      level,
      context: "",
      timestamp: Date.now(),
      source: this.env.name,
      ip: this.globalStore.ip(),
    };
  }

  private sendLog(logEntry: LogEntryDTO): void {
    this.http.post<void>("http://localhost:3000/logs", logEntry).subscribe();
  }
}
