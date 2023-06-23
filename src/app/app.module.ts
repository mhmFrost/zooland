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

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PostComponent,
    CommentComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // I had to import this manually
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    // {provide: MatDialogModule, useValue: {}} // without this I get a NullInjectionError (in the browser devtools)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
