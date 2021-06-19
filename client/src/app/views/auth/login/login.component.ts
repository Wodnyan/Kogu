import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  userCreds = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService.login(this.userCreds.value).subscribe((data: any) => {
      const accessToken = data["auth_token"];
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        this.authService.me().subscribe();
        this.router.navigate(["/"]);
      }
    });
  }
}
