import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ArticlesService } from "src/app/services/articles/articles.service";
import { UserService } from "src/app/services/user/user.service";
import { Article, User } from "src/types";

@Component({
  selector: "app-user-page",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.scss"],
})
export class UserPageComponent implements OnInit {
  userId?: number;
  user?: User = undefined;
  articles: Article[] | [] = [];
  page = 0;
  showLoadMoreBtn = true;

  constructor(
    activeRoute: ActivatedRoute,
    private articlesService: ArticlesService,
    private userService: UserService,
  ) {
    this.userId = activeRoute.snapshot.params.userId;
  }

  ngOnInit(): void {
    if (this.userId) {
      this.articlesService
        .fetchAllArticlesOfUser(this.userId, this.page)
        .subscribe((res) => {
          this.articles = res;
          if (res.length < 25) {
            this.showLoadMoreBtn = false;
          }
        });
      this.userService.fetchUser(this.userId).subscribe((res) => {
        this.user = res;
      });
    }
  }

  loadMoreArticles() {
    const nextPage = this.page + 1;
    this.articlesService
      .fetchAllArticlesOfUser(Number(this.userId), nextPage)
      .subscribe((res) => {
        this.page += 1;
        if (res.length < 1) {
          this.showLoadMoreBtn = false;
        } else {
          this.articles = [...this.articles, ...res];
        }
      });
  }
}
