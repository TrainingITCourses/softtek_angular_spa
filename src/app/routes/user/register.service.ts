import { HttpClient } from "@angular/common/http";
import {
  computed,
  effect,
  inject,
  Injectable,
  Signal,
  signal,
} from "@angular/core";
import { RegisterDto } from "./register-dto.type";
import { UserTokenDto } from "./user-token.dto.type";

@Injectable({
  providedIn: "root",
})
export class RegisterStoreService {
  private http = inject(HttpClient);
  private url = "http://localhost:3000/users/register";

  private userToken = signal<UserTokenDto | undefined>(undefined);
  private registerError = signal<string | undefined>(undefined);

  private tokenEffect = effect(() => {
    const tokenValue = this.userToken()?.token;
    if (tokenValue) {
      console.log("Token value", tokenValue);
    }
  });

  public user: Signal<string | undefined> = computed(
    () => this.userToken()?.user
  );
  public error: Signal<string | undefined> = this.registerError.asReadonly();

  public register(registerDto: RegisterDto): void {
    this.userToken.set(undefined);
    this.registerError.set(undefined);
    this.http.post<UserTokenDto>(this.url, registerDto).subscribe({
      next: (userTokenDto) => this.userToken.set(userTokenDto),
      error: (error) => this.registerError.set(error.message),
    });
  }
}
