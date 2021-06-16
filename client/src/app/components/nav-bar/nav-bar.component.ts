import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { Article, User } from "src/types";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent implements OnInit {
  @Output() newArticleEvent = new EventEmitter<Article>();
  user?: User;
  showCreateArticlePopup = false;

  constructor(authService: AuthService) {
    authService.currentUser.subscribe((user) => {
      if (user !== null) {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {}

  get userPath() {
    return `/users/${this.user?.id}`;
  }

  newArticle(article: Article) {
    this.newArticleEvent.emit(article);
  }

  toggleShowCreateArticlePopup() {
    this.showCreateArticlePopup = !this.showCreateArticlePopup;
  }
}
