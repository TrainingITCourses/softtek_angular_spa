import { httpResource } from "@angular/common/http";
import {
  computed,
  Injectable,
  Resource,
  ResourceStatus,
  signal,
  Signal,
  WritableSignal,
} from "@angular/core";
import { AssetType } from "../../../shared/portfolio/asset.type";
import { CryptoRate } from "../../../shared/portfolio/crypto-rate.type";
import { StockPrice } from "../../../shared/portfolio/stock-price.type";

@Injectable()
export class LoadSymbolPriceService implements Resource<number> {
  private readonly apiUrl = "http://localhost:3000";

  // http://localhost:3000/stocks/AAPL/price
  // {"symbol":"AAPL","price":303,"date":1749637206364}

  // http://localhost:3000/cryptos/BTC/rate
  // {"symbol":"BTC","dollar":4944.18,"date":1749637255729}

  private readonly symbols = httpResource<StockPrice | CryptoRate>(() => {
    if (!this.symbol()) return undefined;
    const finalUrl = `${this.assetUrl()}/${this.symbol()}/${this.assetEndPoint()}`;
    return `${this.apiUrl}/${finalUrl}`;
  });

  public assetType: WritableSignal<AssetType> = signal<AssetType>("stock");
  private assetUrl = computed(() =>
    this.assetType() === "stock" ? "stocks" : "cryptos"
  );
  private assetEndPoint = computed(() =>
    this.assetType() === "stock" ? "price" : "rate"
  );

  public symbol: WritableSignal<string> = signal<string>("AAPL");

  value: Signal<number> = computed(() => {
    if (this.assetType() === "stock") {
      const stockPrice: StockPrice = this.symbols.value() as StockPrice;
      return stockPrice?.price ?? 0;
    } else {
      const cryptoRate: CryptoRate = this.symbols.value() as CryptoRate;
      return cryptoRate?.dollar ?? 0;
    }
  });
  status: Signal<ResourceStatus> = signal("idle");
  error: Signal<Error | undefined> = signal(undefined);
  isLoading: Signal<boolean> = signal(false);
  public hasValue = (): this is Resource<number> => true;
}
