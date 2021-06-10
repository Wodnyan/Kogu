import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { User } from "src/types";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  user: User | null = null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.me().subscribe((resp) => {
      if (resp["id"]) {
        this.user = {
          ...resp,
          createdAt: resp.created_at,
          updatedAt: resp.updated_at,
        };
      }
    });
  }
}
