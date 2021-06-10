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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.userCreds.value);
    this.authService.register(this.userCreds.value).subscribe((data: any) => {
      console.log(data);
      const accessToken = data["auth_token"];
      localStorage.setItem("accessToken", accessToken);
      if (accessToken) {
        this.router.navigate(["/"]);
      }
    });
  }
}
