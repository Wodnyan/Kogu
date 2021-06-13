import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_ENDPOINT_URL } from "src/constants";
import { Article } from "src/types";

@Injectable({
  providedIn: "root",
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  fetchAllArticlesOfUser(userId: number) {
    const headers = new HttpHeaders().set("Authorization", this.bearerToken);
    return this.http.get<Article[] | []>(
      `${API_ENDPOINT_URL}/users/${userId}/articles`,
      {
        withCredentials: true,
        headers,
      },
    );
  }

  fetchAllArticles() {
    return this.http.get<Array<Article>>(`${API_ENDPOINT_URL}/articles`);
  }

  fetchOneArticle(articleId: number) {
    return this.http.get<Article>(`${API_ENDPOINT_URL}/articles/${articleId}`);
  }

  private get bearerToken() {
    return `Bearer ${localStorage.getItem("accessToken")}`;
  }
}
