import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ArticlesService } from "src/app/services/articles/articles.service";

@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.scss"],
})
export class ArticlesComponent implements OnInit {
  articleId: number;

  constructor(
    activeRoute: ActivatedRoute,
    private articlesService: ArticlesService,
  ) {
    this.articleId = activeRoute.snapshot.params.articleId;
  }

  ngOnInit(): void {
    this.articlesService.fetchOneArticle(this.articleId).subscribe((res) => {
      console.log(res);
    });
  }
}
