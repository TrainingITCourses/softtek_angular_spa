import { httpResource } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Portfolio } from "../../shared/models/portfolio.type";

@Injectable({
  providedIn: "root",
})
export class HomeStoreService {
  private readonly portfolioUrl = "http://localhost:3000/portfolio";
  public readonly portfolioResource = httpResource<Portfolio>(
    () => this.portfolioUrl
  );
}
