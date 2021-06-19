import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      if (user !== null) {
        this.user = user;
      }
    });
  }

  get userPath() {
    return `/users/${this.user?.id}`;
  }

  newArticle(article: Article) {
    this.newArticleEvent.emit(article);
  }

  toggleShowCreateArticlePopup() {
    this.showCreateArticlePopup = !this.showCreateArticlePopup;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(["/"]);
      window.location.reload();
    });
  }
}
