import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyinterviewComponent } from './myinterview/myinterview.component';
import { MyworkersComponent } from './myworkers/myworkers.component';
import { PricingComponent } from './pricing/pricing.component';
import { AuthGuard } from './services/guard/auth.guard';
import { NoauthService } from './services/guard/noauth.service';
import { UserAuthService } from './services/guard/user-auth.service';
import { SignupComponent } from './signup/signup.component';
import { StartinterviewComponent } from './startinterview/startinterview.component';
import { TestComponent } from './test/test.component';
import { UserinterviewComponent } from './userinterview/userinterview.component';



const routes: Routes = [
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent,canActivate:[NoauthService]},
  {path:'myworkers',component:MyworkersComponent,canActivate:[UserAuthService]},
  {path:'myinterview',component:MyinterviewComponent,canActivate:[UserAuthService]},
  {path:'startinterview/:nameworker/:iduser/:key',component:StartinterviewComponent},
  {path:'startinterview/:nameworker/:iduser/:key',component:TestComponent},
 // {path:'startinterview/:documentid',component:StartinterviewComponent},
  {path:'message',component:UserinterviewComponent},
  {path:'contact',component:ContactComponent},
  {path:'pricing',component:PricingComponent},
  {path:'signupforuser',component:SignupComponent},
 // {path:'loginworker',component:LoginWorkerComponent,canActivate:[NoauthService]}
]; // sets up routes constant where you define your routes


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }