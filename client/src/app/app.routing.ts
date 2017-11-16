import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { RedirectComponent } from './redirect/redirect.component';
import { SocialLoginRedirectComponent } from './social-login-redirect/social-login-redirect.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
{
  path: 'user',
  canActivate:[AuthGuard],
  loadChildren: './User/layout.module#LayoutModule',
},
{
  path: 'admin',
  canActivate:[AuthGuard],
  loadChildren: './admin/admin.module#AdminModule',
},
{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full',
},
{
  path : 'login',
  component : LoginComponent
},
{
  path : 'register',
  component: RegisterComponent
},
{ path : 'redirect/:id', component : RedirectComponent},
{
  path: 'admin',
  loadChildren: './admin/admin.module#AdminModule',
},
{ 
  path : 'socialloginredirect',
  component : SocialLoginRedirectComponent
},
{
  path: 'user',
  loadChildren: './User/layout.module#LayoutModule',

},
{ path: 'forgotpassword', loadChildren: './forgotpassword/forgotpassword.module#ForgotpasswordModule' },
{ path: 'setpassword/:username/:_id', loadChildren: './setpassword/setpassword.module#SetpasswordModule' },
{ path : 'error',component : ErrorComponent},
]


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
