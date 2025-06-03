import { httpResource } from "@angular/common/http";
import { computed, inject, Injectable } from "@angular/core";
import { GlobalStore } from "../../../shared/global/global.store";

@Injectable({
  providedIn: "root",
})
export class UserStore {
  private globalStore = inject(GlobalStore);
  private url = "http://localhost:3000/users/me";
  private userMe = httpResource(() => this.url);
  public user = computed(() => this.userMe.value());

  public logout() {
    this.globalStore.changeUser(undefined);
  }
}
