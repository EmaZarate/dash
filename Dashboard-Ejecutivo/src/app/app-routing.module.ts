import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { ErrorLoginComponent } from './error-login/error-login.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo : 'login', 
    pathMatch: 'full'
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path:'error-login',
    component: ErrorLoginComponent
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{
      useHash:false
    })
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
