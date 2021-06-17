import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ArticlesService } from "src/app/services/articles/articles.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { Article } from "src/types";

@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.scss"],
})
export class ArticlesComponent implements OnInit {
  public articleId: number;
  public article?: Article;

  public userId?: number;

  public showOptions = false;
  public showDeletePrompt = false;

  constructor(
    activeRoute: ActivatedRoute,
    authService: AuthService,
    private articlesService: ArticlesService,
    private router: Router,
  ) {
    this.articleId = activeRoute.snapshot.params.articleId;
    authService.currentUser.subscribe((user) => (this.userId = user?.id));
  }

  ngOnInit(): void {
    this.articlesService.fetchOneArticle(this.articleId).subscribe((res) => {
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
