import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';
import {YoutubePlayerModule} from 'ng2-youtube-player';
import {ResetPasswordComponent } from './reset-password/reset-password.component';
import {EditprofileComponent } from './editprofile/editprofile.component';
import { AvatarModule } from "ng2-avatar";
import {
  AppAsideComponent,
  AppFooterComponent,
  AppHeaderComponent,
  //AppSidebarMinimizerComponent,
  AppSidebarComponent,
  //APP_SIDEBAR_NAV
} from './common';
// Import directives
import {MatSidenavModule} from '@angular/material';
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES,
} from './../directives';
import { LayoutComponent } from './layout.component';
import { DashboardUserComponent} from './dashboard-user/dashboard-user.component';
import { ChatComponent } from './chat/chat.component';
import { BottomChatComponent } from './bottom-chat/bottom-chat.component';
import { FloatingActionMenuModule } from 'ng2-floating-action-menu';
@NgModule({
  imports: [
  CommonModule,
  LayoutRoutingModule,
  YoutubePlayerModule,
  FormsModule,
  FloatingActionMenuModule,
  MatSidenavModule,
  AvatarModule.forRoot()
  ],
  declarations: [
  LayoutComponent,
  DashboardUserComponent,
  ChatComponent,
  BottomChatComponent,
  AppFooterComponent,
  ResetPasswordComponent,
  EditprofileComponent,
AppHeaderComponent,
AppSidebarComponent,
//AppSidebarMinimizerComponent,
AppAsideComponent,
//APP_SIDEBAR_NAV,
AsideToggleDirective,
NAV_DROPDOWN_DIRECTIVES,
ReplaceDirective,
SIDEBAR_TOGGLE_DIRECTIVES

  ]
})
export class LayoutModule { }
