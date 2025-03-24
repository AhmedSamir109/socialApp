import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostsComponent } from './components/posts/posts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateNewPostComponent } from './components/create-new-post/create-new-post.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { FilterHiddenPostsPipe } from './pipes/filter-hidden-posts.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loadingInterceptor } from './interceptor/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostsComponent,
    CreateNewPostComponent,
    LoginFormComponent,
    RegisterFormComponent,
    NotFoundComponent,
    FilterHiddenPostsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,


  ],
  exports:[],
  providers: [ 
    provideHttpClient(
      withInterceptors([loadingInterceptor]) 
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
