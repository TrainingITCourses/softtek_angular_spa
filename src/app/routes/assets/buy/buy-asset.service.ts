import {
  inject,
  Injectable,
  Resource,
  ResourceStatus,
  signal,
} from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { CreateTransactionDto } from "../../../shared/portfolio/create-transaction.dto";
import {
  DEFAULT_TRANSACTION,
  Transaction,
} from "../../../shared/portfolio/transaction.type";

@Injectable()
export class BuyAssetService implements Resource<Transaction> {
  private readonly url = "http://localhost:3000/portfolios";
  private http = inject(HttpClient);

  public value = signal<Transaction>(DEFAULT_TRANSACTION);
  public status = signal<ResourceStatus>("idle");
  public error = signal<Error | undefined>(undefined);
  public isLoading = signal<boolean>(false);
  public hasValue = (): this is Resource<Transaction> => true;

  public buyAsset(
    portfolioId: string,
    transaction: CreateTransactionDto
  ): void {
    this.status.set("loading");
    this.error.set(undefined);
    this.http
      .post<Transaction>(`${this.url}/${portfolioId}/transactions`, transaction)
      .subscribe({
        next: () => {
          this.status.set("resolved");
        },
        error: (error) => {
          const bodyError = (error as any).error;
          if (bodyError) {
            this.error.set(bodyError);
          } else {
            this.error.set(error);
          }
          this.status.set("error");
        },
      });
  }
}
