import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./views/home/home.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { RegisterComponent } from "./views/auth/register/register.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "./components/button/button.component";
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { ArticlesComponent } from './views/articles/articles.component';
import { UserPageComponent } from './views/user-page/user-page.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
