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
  showLoadMoreBtn = false;
  page = 0;

  constructor(
    private authService: AuthService,
    private articleService: ArticlesService,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      if (user !== null) {
        this.user = user;
      }
    });
    this.articleService.fetchAllArticles(this.page).subscribe((resp) => {
      this.articles = resp;
      this.showLoadMoreBtn = true;
      if (resp.length < 25) {
        this.showLoadMoreBtn = false;
      }
    });
  }

  prependArticle(article: Article) {
    this.articles = [article, ...this.articles];
  }

  isAuthenticated() {
    return Boolean(this.user?.id);
  }

  loadMoreArticles() {
    const nextPage = this.page + 1;
    this.articleService.fetchAllArticles(nextPage).subscribe((res) => {
      this.page += 1;
      if (res.length < 1) {
        this.showLoadMoreBtn = false;
      } else {
        this.articles = [...this.articles, ...res];
      }
    });
  }
}
