import { Component, HostListener, OnInit, ElementRef } from "@angular/core";
import { ArticlesService } from "src/app/services/articles/articles.service";
import { Article } from "src/types";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent implements OnInit {
  search = "";

  results: Article[] | [] = [];

  isDropdownOpen = false;

  constructor(
    private articlesService: ArticlesService,
    private elementRef: ElementRef,
  ) {}

  ngOnInit(): void {}

  @HostListener("document:mousedown", ["$event"])
  onGlobalClick(event: any): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  onFocus(_: any) {
    this.isDropdownOpen = true;
  }

  onChange(value: any) {
    if (value.length > 2) {
      this.articlesService.searchArticleByTitle(value).subscribe((res) => {
        this.results = res;
        this.isDropdownOpen = true;
      });
    }
  }

  articleLink(id: number) {
    return `articles/${id}`;
  }
}
