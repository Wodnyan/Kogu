import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArticlesComponent } from "./views/articles/articles.component";
import { RegisterComponent } from "./views/auth/register/register.component";
import { HomeComponent } from "./views/home/home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "auth",
    children: [
      {
        path: "register",
        component: RegisterComponent,
      },
    ],
  },
  {
    path: "articles/:articleId",
    component: ArticlesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
