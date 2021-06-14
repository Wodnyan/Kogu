import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ArticlesService } from "src/app/services/articles/articles.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { Article, User } from "src/types";

@Component({
  selector: "app-create-article-popup",
  templateUrl: "./create-article-popup.component.html",
  styleUrls: ["./create-article-popup.component.scss"],
})
export class CreateArticlePopupComponent implements OnInit {
  @Output() closePopupEvent = new EventEmitter<undefined>();
  @Output() newArticleEvent = new EventEmitter<Article>();

  article = new FormGroup({
    title: new FormControl(""),
    description: new FormControl(""),
    text: new FormControl(""),
  });
  user?: User;

  constructor(
    authService: AuthService,
    private articlesService: ArticlesService,
  ) {
    authService.me().subscribe((res) => {
      if (res.id) {
        this.user = res;
      }
    });
  }

  ngOnInit(): void {}

  closePopup() {
    this.closePopupEvent.emit();
  }

  onSubmit() {
    if (this.user?.id) {
      this.articlesService
        .createArticle(this.article.value)
        .subscribe((res) => {
          if (res.id) {
            this.newArticleEvent.emit(res);
            this.article.reset();
          }
        });
    }
  }
}
