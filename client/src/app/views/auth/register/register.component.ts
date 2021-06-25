import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  userCreds = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
  });
  errors = {
    email: null,
    name: null,
    password: null,
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService.register(this.userCreds.value).subscribe(
      (data: any) => {
        const accessToken = data["auth_token"];
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          this.router.navigate(["/"]);
          this.authService.me().subscribe();
        }
      },
      (err) => {
        this.errors = {
          email: err.error.email,
          password: err.error.password,
          name: err.error.name,
        };
      },
    );
  }
}
