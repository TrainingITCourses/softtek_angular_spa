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
    this.globalStore.changeToken(userToken.token);
    this.globalStore.changeUser(userToken.user);
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
