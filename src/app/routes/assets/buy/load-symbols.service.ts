import { httpResource } from "@angular/common/http";
import { computed, Injectable, Resource, signal, WritableSignal } from "@angular/core";
import { AssetType } from "../../../shared/portfolio/asset.type";

export type AnySymbol = {
  symbol: string;
  name: string;
};

@Injectable()
export class LoadSymbolsService implements Resource<AnySymbol[]> {
  private readonly apiUrl = "http://localhost:3000";
  private readonly symbols = httpResource<AnySymbol[]>(() => `${this.apiUrl}/${this.assetUrl()}`);

  public assetType: WritableSignal<AssetType> = signal<AssetType>("stock");
  private assetUrl = computed(() => (this.assetType() === "stock" ? "stocks" : "cryptos"));

  public value = computed(() => this.symbols.value() ?? []);
  public status = this.symbols.status;
  public error = this.symbols.error;
  public isLoading = this.symbols.isLoading;
  public hasValue = (): this is Resource<AnySymbol[]> => true;
}
