import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AlertModule } from './services/Alert';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './modules/layouts/navbar/navbar.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './modules/layouts/home/home.component';
import { TaskComponent } from './modules/components/task/task.component';
import { TaskDetailComponent } from './modules/components/task-detail/task-detail.component';
import { PageNotFoundComponent } from './modules/layouts/page-not-found/page-not-found.component';
import { LoginComponent } from './modules/layouts/login/login.component';
import { RegisterComponent } from './modules/layouts/register/register.component';

import { AlertComponent } from './modules/components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TaskComponent,
    TaskDetailComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    AlertComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule, AlertModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
