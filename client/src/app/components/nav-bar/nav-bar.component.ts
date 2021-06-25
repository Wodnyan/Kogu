import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Article } from "src/types";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent implements OnInit {
  @Output() newArticleEvent = new EventEmitter<Article>();

  ngOnInit(): void {}

  newArticle(article: Article) {
    this.newArticleEvent.emit(article);
  }
}
