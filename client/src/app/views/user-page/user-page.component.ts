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
        .fetchAllArticlesOfUser(this.userId)
        .subscribe((res) => {
          this.articles = res;
        });
      this.userService.fetchUser(this.userId).subscribe((res) => {
        console.log(res);
        this.user = res;
      });
    }
  }
}
