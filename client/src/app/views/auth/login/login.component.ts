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
  errors = {
    email: null,
    password: null,
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.errors = {
      email: null,
      password: null,
    };
    this.authService.login(this.userCreds.value).subscribe(
      (data: any) => {
        localStorage.setItem("accessToken", data["auth_token"]);
        this.authService.me().subscribe();
        this.router.navigate(["/"]);
      },
      (err) => {
        const errors = JSON.parse(err.error.message);
        console.log(errors.email);
        this.errors = {
          email: errors.email || null,
          password: errors.password || null,
        };
      },
    );
  }
}
