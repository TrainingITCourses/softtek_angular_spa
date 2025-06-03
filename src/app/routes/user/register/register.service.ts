import { HttpClient } from "@angular/common/http";
import { effect, inject, Injectable, Signal, signal } from "@angular/core";
import { GlobalStore } from "../../../shared/global/global.store";
import { UserTokenDto } from "../user-token.dto.type";
import { RegisterDto } from "./register-dto.type";

@Injectable({
  providedIn: "root",
})
export class RegisterStoreService {
  private http = inject(HttpClient);
  private globalStore = inject(GlobalStore);
  private url = "http://localhost:3000/users/register";

  public userToken = signal<UserTokenDto | undefined>(undefined);
  private registerError = signal<string | undefined>(undefined);

  private userTokenEffect = effect(() => {
    const userToken = this.userToken();
    if (!userToken) return;
    const tokenValue = userToken.token;
    if (tokenValue) {
      localStorage.setItem("token", tokenValue);
    } else {
      localStorage.removeItem("token");
    }
    const userValue = userToken.user;
    if (userValue) {
      this.globalStore.changeUser(userValue);
    } else {
      this.globalStore.changeUser("");
    }
  });

  public error: Signal<string | undefined> = this.registerError.asReadonly();

  public register(registerDto: RegisterDto): void {
    this.userToken.set(undefined);
    this.registerError.set(undefined);
    this.http.post<UserTokenDto>(this.url, registerDto).subscribe({
      next: (userToken) => this.userToken.set(userToken),
      error: (error) => this.registerError.set(error.message),
    });
  }
}
