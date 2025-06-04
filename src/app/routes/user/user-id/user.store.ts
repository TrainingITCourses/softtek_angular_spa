import { httpResource, HttpResourceRef } from "@angular/common/http";
import {
  computed,
  effect,
  inject,
  Injectable,
  ResourceStatus,
  Signal,
} from "@angular/core";
import { GlobalStore } from "../../../shared/global/global.store";
import { IpApi } from "../../home/ip-api.type";

@Injectable({
  providedIn: "root",
})
export class UserStore {
  private globalStore = inject(GlobalStore);
  private url = "http://localhost:3000/users/me";
  private userMe = httpResource(() => this.url);
  public user = computed(() => this.userMe.value());
  private readonly IP_API_URL = "http://ip-api.com/json";

  private ipApiResource: HttpResourceRef<IpApi | undefined> =
    httpResource<IpApi>(() => this.IP_API_URL);

  public ipApi: Signal<IpApi | undefined> =
    this.ipApiResource.value.asReadonly();

  public ipApiStatus: Signal<ResourceStatus> = computed(() => {
    // trigger when the ipApiResource value changes
    const status: ResourceStatus = this.ipApiResource.status();
    return status;
  });

  private onIpApiChange = effect(() => {
    // trigger when the ipApiResource value changes
    const ipApi = this.ipApiResource.value();
    // guard against undefined
    if (!ipApi) return;
    // action to perform when the ipApiResource value changes
    this.globalStore.changeIp(ipApi.query);
  });
  public logout() {
    this.globalStore.changeUser(undefined);
  }
}
