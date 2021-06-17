import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_ENDPOINT_URL } from "src/constants";
import { Article } from "src/types";

type CreateArticlePayload = {
  title: string;
  text: string;
  description: string;
};

@Injectable({
  providedIn: "root",
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  fetchAllArticlesOfUser(userId: number) {
    return this.http.get<Article[] | []>(
      `${API_ENDPOINT_URL}/users/${userId}/articles`,
      {
        withCredentials: true,
        headers: this.headers,
      },
    );
  }

  fetchAllArticles() {
    return this.http.get<Array<Article>>(`${API_ENDPOINT_URL}/articles`);
  }

  fetchOneArticle(articleId: number) {
    return this.http.get<Article>(`${API_ENDPOINT_URL}/articles/${articleId}`);
  }

  createArticle(article: CreateArticlePayload) {
    return this.http.post<Article>(`${API_ENDPOINT_URL}/articles`, article, {
      headers: this.headers,
    });
  }

  deleteArticle(articleId: number) {
    return this.http.delete<any>(`${API_ENDPOINT_URL}/articles/${articleId}`, {
      headers: this.headers,
    });
  }

  private get bearerToken() {
    return `Bearer ${localStorage.getItem("accessToken")}`;
  }

  private get headers() {
    return new HttpHeaders().set("Authorization", this.bearerToken);
  }
}
