import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./views/home/home.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { RegisterComponent } from "./views/auth/register/register.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ButtonComponent } from "./components/button/button.component";
import { ArticleCardComponent } from "./components/article-card/article-card.component";
import { ArticlesComponent } from "./views/articles/articles.component";
import { UserPageComponent } from "./views/user-page/user-page.component";
import { CreateArticlePopupComponent } from "./components/create-article-popup/create-article-popup.component";
import { LoginComponent } from "./views/auth/login/login.component";
import { MenusComponent } from "./components/nav-bar/menus/menus.component";
import { SearchBarComponent } from "./components/nav-bar/search-bar/search-bar.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    RegisterComponent,
    ButtonComponent,
    ArticleCardComponent,
    ArticlesComponent,
    UserPageComponent,
    CreateArticlePopupComponent,
    LoginComponent,
    MenusComponent,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
