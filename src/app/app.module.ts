import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
const appRoutes:Routes=[
  {path:'', redirectTo:'/home' ,pathMatch:'full'},
  {path:'home', component:HomeComponent},
  ];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
