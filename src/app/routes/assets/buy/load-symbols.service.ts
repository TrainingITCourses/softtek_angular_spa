import { httpResource } from "@angular/common/http";
import {
  computed,
  Injectable,
  Resource,
  ResourceStatus,
  signal,
  Signal,
} from "@angular/core";
import { AssetType } from "../../../shared/portfolio/asset.type";

export type AnySymbol = {
  symbol: string;
  name: string;
};

@Injectable()
export class LoadSymbolsService implements Resource<AnySymbol[]> {
  private readonly apiUrl = "http://localhost:3000";
  private readonly symbols = httpResource<AnySymbol[]>(
    () => `${this.apiUrl}/${this.assetUrl()}`
  );

  public assetType = signal<AssetType>("stock");
  private assetUrl = computed(() =>
    this.assetType() === "stock" ? "stocks" : "cryptos"
  );

  value: Signal<AnySymbol[]> = computed(() => this.symbols.value() ?? []);
  status: Signal<ResourceStatus> = signal("idle");
  error: Signal<Error | undefined> = signal(undefined);
  isLoading: Signal<boolean> = signal(false);
  public hasValue = (): this is Resource<AnySymbol[]> => true;
}
