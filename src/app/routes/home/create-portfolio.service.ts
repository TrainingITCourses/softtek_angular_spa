import { HttpClient } from "@angular/common/http";
import {
  inject,
  Injectable,
  Resource,
  ResourceStatus,
  signal,
  WritableSignal,
} from "@angular/core";
import {
  DEFAULT_PORTFOLIO,
  Portfolio,
} from "../../shared/portfolio/portfolio.type";

@Injectable()
export class CreatePortfolioService implements Resource<Portfolio> {
  private readonly portfolioUrl = "http://localhost:3000/portfolios";
  private http = inject(HttpClient);

  public value: WritableSignal<Portfolio> = signal(DEFAULT_PORTFOLIO);
  public status: WritableSignal<ResourceStatus> = signal("idle");
  public error: WritableSignal<Error | undefined> = signal(undefined);
  public isLoading: WritableSignal<boolean> = signal(false);
  public hasValue = (): this is Resource<Portfolio> => true;

  public createPortfolio(portfolio: Portfolio) {
    console.log("saving", portfolio);
    this.status.set("loading");
    this.http.post<Portfolio>(this.portfolioUrl, portfolio).subscribe({
      next: (body) => {
        this.value.set(body);
        this.status.set("resolved");
      },
      error: (httpError) => {
        const bodyError = (httpError as any).error;
        if (bodyError) {
          this.error.set(bodyError);
        } else {
          this.error.set(httpError);
        }
        this.status.set("error");
      },
    });
  }
}
