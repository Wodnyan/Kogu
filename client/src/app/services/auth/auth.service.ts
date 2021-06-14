import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_ENDPOINT_URL } from "src/constants";

type UserCredentials = {
  name: string;
  password: string;
  email: string;
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private registerEndpoint = `${API_ENDPOINT_URL}/signup`;
  private meEndpoint = `${API_ENDPOINT_URL}/me`;

  constructor(private http: HttpClient) {}

  register(userCredentials: UserCredentials) {
    return this.http.post(this.registerEndpoint, userCredentials, {
      withCredentials: true,
    });
  }

  me() {
    const headers = new HttpHeaders().set("Authorization", this.bearerToken);
    return this.http.get<{
      id: number;
      name: string;
      email: string;
      updatedAt: string;
      createdAt: string;
    }>(this.meEndpoint, {
      withCredentials: true,
      headers: headers,
    });
  }

  private get bearerToken() {
    return `Bearer ${localStorage.getItem("accessToken")}`;
  }
}
