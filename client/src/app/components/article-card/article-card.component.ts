import { Component, Input, OnInit } from "@angular/core";
import { Article } from "src/types";

@Component({
  selector: "app-article-card",
  templateUrl: "./article-card.component.html",
  styleUrls: ["./article-card.component.scss"],
})
export class ArticleCardComponent implements OnInit {
  @Input("article") article?: Article = undefined;

  constructor() {}

  ngOnInit(): void {}

  get articleRoute(): string {
    return `/articles/${this.article?.id}`;
  }

  get userRoute(): string {
    return `/users/${this.article?.author.id}`;
  }
}
