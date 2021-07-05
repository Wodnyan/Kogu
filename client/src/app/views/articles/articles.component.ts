import { Component, DoCheck, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ArticlesService } from "src/app/services/articles/articles.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { Article } from "src/types";

@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.scss"],
})
export class ArticlesComponent implements OnInit, DoCheck {
  public articleId?: number;
  public article?: Article;

  public userId?: number;

  public showOptions = false;
  public showDeletePrompt = false;

  constructor(
    authService: AuthService,
    private router: Router,
    private articlesService: ArticlesService,
    private activeRouter: ActivatedRoute,
  ) {
    authService.currentUser.subscribe((user) => (this.userId = user?.id));
    this.activeRouter.params.subscribe((params) => {
      this.articleId = params.articleId;
    });
  }

  ngDoCheck(): void {
    // Fetch new article if article ids don't match
    if (Number(this.articleId) !== Number(this.article?.id)) {
      this.articlesService
        .fetchOneArticle(this.articleId || 0)
        .subscribe((res) => {
          this.article = res;
        });
    }
  }

  ngOnInit(): void {
    this.articlesService
      .fetchOneArticle(this.articleId || 0)
      .subscribe((res) => {
        this.article = res;
      });
  }

  public get isOwner() {
    return this.article?.author.id === this.userId;
  }

  public toggleShowOptions() {
    this.showOptions = !this.showOptions;
  }

  public toggleShowDeletePrompt() {
    this.showDeletePrompt = !this.showDeletePrompt;
  }

  public deleteArticle() {
    if (this.article?.id) {
      this.articlesService.deleteArticle(this.article.id).subscribe((res) => {
        console.log(res);
        this.router.navigate(["/"]);
      });
    }
  }
}
