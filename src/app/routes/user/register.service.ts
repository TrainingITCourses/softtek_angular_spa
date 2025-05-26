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

  private registerSignal = signal<UserTokenDto | undefined>(undefined);
  private registerErrorSignal = signal<string | undefined>(undefined);

  private tokenEffect = effect(() => {
    const tokenValue = this.registerSignal()?.token;
    if (tokenValue) {
      console.log("Token value", tokenValue);
    }
  });

  public userSignal: Signal<string | undefined> = computed(
    () => this.registerSignal()?.user
  );
  public errorSignal: Signal<string | undefined> =
    this.registerErrorSignal.asReadonly();

  public register(registerDto: RegisterDto): void {
    this.registerSignal.set(undefined);
    this.registerErrorSignal.set(undefined);
    this.http.post<UserTokenDto>(this.url, registerDto).subscribe({
      next: (userTokenDto) => this.registerSignal.set(userTokenDto),
      error: (error) => this.registerErrorSignal.set(error.message),
    });
  }
}
