import { httpResource, HttpResourceRef } from "@angular/common/http";
import {
  computed,
  effect,
  inject,
  Injectable,
  ResourceStatus,
  Signal,
  WritableSignal,
} from "@angular/core";
import { LogService } from "../../shared/log/log.service";
import { IpApi } from "./ip-api.type";

@Injectable({
  providedIn: "root",
})
export class HomeStoreService {
  private readonly log = inject(LogService);
  private readonly IP_API_URL = "http://ip-api.com/json";

  private ipApiResource: HttpResourceRef<IpApi | undefined> =
    httpResource<IpApi>(this.IP_API_URL);

  public ipApi: WritableSignal<IpApi | undefined> = this.ipApiResource.value;

  public ipApiStatus: Signal<string> = computed(() => {
    // trigger
    const status: ResourceStatus = this.ipApiResource.status();
    // mapper
    return ResourceStatus[status];
  });

  private onIpApiChange = effect(() => {
    // trigger
    const ipApi: IpApi | undefined = this.ipApiResource.value();
    // action
    if (!ipApi) {
      return;
    }
    this.log.info(`My ip is : ${ipApi.query}`);
  });
}
