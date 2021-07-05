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
    console.log(this.userCreds.value);
    this.authService.login(this.userCreds.value).subscribe(
      (data: any) => {
        localStorage.setItem("accessToken", data["auth_token"]);
        this.authService.me().subscribe();
        this.router.navigate(["/"]);
      },
      (err) => {
        console.log(err.error);
        this.errors = {
          email: err.error.email || null,
          password: err.error.password || null,
        };
      },
    );
  }
}
