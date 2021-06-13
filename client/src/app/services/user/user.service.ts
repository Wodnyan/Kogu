import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_ENDPOINT_URL } from "src/constants";
import { User } from "src/types";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  fetchUser(userId: number) {
    return this.http.get<User>(`${API_ENDPOINT_URL}/users/${userId}`);
  }
}
