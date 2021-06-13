import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { API_ENDPOINT_URL } from "src/constants";
import { User } from "src/types";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent implements OnInit {
  user?: User;
  constructor(authService: AuthService) {
    authService.me().subscribe((res) => {
      console.log(res);
      if (res.id) {
        this.user = {
          ...res,
          createdAt: res.created_at,
          updatedAt: res.updated_at,
        };
      }
    });
  }

  ngOnInit(): void {}

  get userPath() {
    return `users/${this.user?.id}`;
  }
}
