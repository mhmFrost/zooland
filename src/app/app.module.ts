import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import {HttpClientModule} from "@angular/common/http";
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import {FormsModule} from "@angular/forms";
import { SignupComponent } from './signup/signup.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {CookieService} from "ngx-cookie-service";
import {MatSidenavModule} from "@angular/material/sidenav";
import { NavbarComponent } from './navbar/navbar.component';
import {MatIconModule} from "@angular/material/icon";
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './profile/settings/settings.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PopupComponent } from './post/popup/popup.component';
import { CreateComponent } from './post/create/create.component';
import { FilterComponent } from './navbar/filter/filter.component';
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PostComponent,
    CommentComponent,
    SignupComponent,
    NavbarComponent,
    ProfileComponent,
    SettingsComponent,
    LoginComponent,
    HomeComponent,
    PopupComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // I had to import this manually
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
