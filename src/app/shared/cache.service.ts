import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CacheService {
  public set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get<T>(key: string): T | undefined {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  }
}
