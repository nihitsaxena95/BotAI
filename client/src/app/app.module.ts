import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DndModule, DragDropService, DragDropConfig, DragDropSortableService } from 'ng2-dnd';
import { ErrorComponent } from './error/error.component';
import {SocialLoginRedirectComponent} from './social-login-redirect/social-login-redirect.component';
import {AsideService} from './User/common/app-aside/app-aside.service';
import {RegisterComponent} from './register/register.component'
import {RedirectComponent} from './redirect/redirect.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Http,HttpModule} from '@angular/http';
import { AuthGuard } from './auth/auth.guard';
import { AvatarModule } from "ng2-avatar";

// Import containers
// Import directives
import {
  //   AsideToggleDirective,
  //   NAV_DROPDOWN_DIRECTIVES,
  //   ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';
// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {YoutubePlayerModule} from 'ng2-youtube-player';

@NgModule({
  imports: [
  BrowserModule,
  BrowserAnimationsModule,
  HttpModule,
  DndModule.forRoot(),
  FormsModule,ReactiveFormsModule,
  CommonModule,
  AppRoutingModule,
  HttpModule,
  BsDropdownModule.forRoot(),
  TabsModule.forRoot(),
  AvatarModule.forRoot(),
  ChartsModule,
  YoutubePlayerModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  declarations: [
  AppComponent,
  LoginComponent,
  RegisterComponent,

  ErrorComponent,
  RedirectComponent,
  SocialLoginRedirectComponent,
  // AsideToggleDirective,

  ErrorComponent,
  SocialLoginRedirectComponent,
  RegisterComponent,
  RedirectComponent,
  // NAV_DROPDOWN_DIRECTIVES,
  // ReplaceDirective,
  // SIDEBAR_TOGGLE_DIRECTIVES
  ],
  providers:
  [AsideService,AuthGuard, 
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy},
    DragDropService,DragDropConfig,DragDropSortableService],
    bootstrap: [ AppComponent ]
  })
export class AppModule { }

