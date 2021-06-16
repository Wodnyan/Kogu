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
    console.log(this.userCreds.value);
    this.authService.login(this.userCreds.value).subscribe((data: any) => {
      const accessToken = data["auth_token"];
      localStorage.setItem("accessToken", accessToken);
      if (accessToken) {
        this.router.navigate(["/"]);
      }
    });
  }
}
