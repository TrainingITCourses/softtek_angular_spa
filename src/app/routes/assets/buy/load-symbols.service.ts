import {
  Injectable,
  Resource,
  ResourceStatus,
  signal,
  Signal,
} from "@angular/core";

export type AnySymbol = {
  symbol: string;
  name: string;
};

@Injectable()
export class LoadSymbolsService implements Resource<AnySymbol[]> {
  value: Signal<AnySymbol[]> = signal([
    {
      symbol: "AAPL",
      name: "Apple",
    },
    {
      symbol: "MSFT",
      name: "Microsoft",
    },
  ]);
  status: Signal<ResourceStatus> = signal("idle");
  error: Signal<Error | undefined> = signal(undefined);
  isLoading: Signal<boolean> = signal(false);
  public hasValue = (): this is Resource<AnySymbol[]> => true;
}
