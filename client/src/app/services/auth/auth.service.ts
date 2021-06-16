import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { API_ENDPOINT_URL } from "src/constants";
import { User } from "src/types";

type RegisterUserCredentials = {
  name: string;
  password: string;
  email: string;
};

type LoginUserCredentials = {
  password: string;
  email: string;
};

type AuthUser = User | null;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private registerEndpoint = `${API_ENDPOINT_URL}/signup`;
  private loginEndpoint = `${API_ENDPOINT_URL}/auth/login`;
  private meEndpoint = `${API_ENDPOINT_URL}/me`;

  private currentUserSubject: BehaviorSubject<AuthUser>;
  public currentUser: Observable<AuthUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AuthUser>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(userCredentials: RegisterUserCredentials) {
    return this.http.post(this.registerEndpoint, userCredentials, {
      withCredentials: true,
    });
  }

  login(userCredentials: LoginUserCredentials) {
    return this.http.post(this.loginEndpoint, userCredentials, {
      withCredentials: true,
    });
  }

  me() {
    const headers = new HttpHeaders().set("Authorization", this.bearerToken);

    return this.http
      .get<{
        id: number;
        name: string;
        email: string;
        updatedAt: string;
        createdAt: string;
      }>(this.meEndpoint, {
        withCredentials: true,
        headers: headers,
      })
      .pipe(
        map((user) => {
          this.currentUserSubject.next(user);
          return user;
        }),
      );
  }

  private get bearerToken() {
    return `Bearer ${localStorage.getItem("accessToken")}`;
  }
}
