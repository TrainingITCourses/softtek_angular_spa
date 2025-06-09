import { httpResource } from "@angular/common/http";
import {
  computed,
  Injectable,
  Resource,
  ResourceStatus,
  Signal,
} from "@angular/core";
import { DEFAULT_PORTFOLIO, Portfolio } from "./portfolio.type";

@Injectable()
export class LoadPortfolioService implements Resource<Portfolio> {
  private readonly portfolioUrl = "http://localhost:3000/portfolios";
  private readonly portfolioResource = httpResource<Portfolio[]>(
    () => this.portfolioUrl
  );

  public value: Signal<Portfolio> = computed(
    () => this.portfolioResource.value()?.[0] ?? DEFAULT_PORTFOLIO
  );
  public status: Signal<ResourceStatus> = this.portfolioResource.status;
  public error: Signal<Error | undefined> = this.portfolioResource.error;
  public isLoading: Signal<boolean> = this.portfolioResource.isLoading;
  public hasValue = (): this is Resource<Portfolio> => true;

  public loadPortfolio() {
    this.portfolioResource.reload();
  }
}
