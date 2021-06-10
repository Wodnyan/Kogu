import { Component, OnInit } from "@angular/core";
import { ArticlesService } from "src/app/services/articles/articles.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { Article, User } from "src/types";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  user: User | null = null;
  articles: Article[] | [] = [];
  constructor(
    private authService: AuthService,
    private articleService: ArticlesService,
  ) {}

  ngOnInit(): void {
    this.authService.me().subscribe((resp) => {
      if (resp["id"]) {
        this.user = {
          ...resp,
          createdAt: resp.created_at,
          updatedAt: resp.updated_at,
        };
      }
    });
    this.articleService.fetchAllArticles().subscribe((resp) => {
      this.articles = resp;
    });
  }
}
