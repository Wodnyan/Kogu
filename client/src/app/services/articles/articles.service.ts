import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_ENDPOINT_URL } from "src/constants";

@Injectable({
  providedIn: "root",
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  fetchAllArticlesOfUser(userId: number) {
    const headers = new HttpHeaders().set("Authorization", this.bearerToken);
    return this.http.get(`${API_ENDPOINT_URL}/users/${userId}/articles`, {
      withCredentials: true,
      headers,
    });
  }

  fetchAllArticles() {
    return this.http.get<
      Array<{
        description: string;
        title: string;
        text: string;
        id: number;
        created_at: string;
        updated_at: string;
      }>
    >(`${API_ENDPOINT_URL}/articles`);
  }

  private get bearerToken() {
    return `Bearer ${localStorage.getItem("accessToken")}`;
  }
}
