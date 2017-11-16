import { NgModule } from '@angular/core';/*
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; */// <-- import required BrowserAnimationsModule

import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import {DndModule} from 'ng2-dnd';
import {FormsModule} from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

// Import containers
import { CollapsibleModule } from 'angular2-collapsible';
import {
  DashboardComponent
} from './dashboard/dashboard.component';
// Import components
import {AdminComponent} from './admin.component';
import {
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent
} from './common';
// Import directives
import {
  //AsideToggleDirective,
  // NAV_DROPDOWN_DIRECTIVES,
  /*ReplaceDirective,*/
  SIDEBAR_TOGGLE_DIRECTIVES
} from './../directives';
// Import routing module
import { AdminRoutingModule } from './admin.routing';
// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BottomChatComponent } from './bottom-chat/bottom-chat.component';
import { FloatingActionMenuModule } from 'ng2-floating-action-menu';
import { TagInputModule } from 'ngx-chips';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ContextComponent } from './context/context.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { BottrainingComponent } from './bottraining/bottraining.component';
import { EditContextComponent } from './edit-context/edit-context.component';
import { CreateFlowComponent } from './create-flow/create-flow.component';
import {TraindomainComponent} from './traindomain/traindomain.component';

@NgModule({
  imports: [
  CommonModule,
  AngularMultiSelectModule,
  FormsModule,
  AngularMultiSelectModule,
  DndModule.forRoot(),
  AdminRoutingModule,
  BsDropdownModule.forRoot(),
  TabsModule.forRoot(),
  ChartsModule,
  FloatingActionMenuModule,
    TagInputModule,/*
     BrowserModule,
     BrowserAnimationsModule,*/  // <-- include required BrowserAnimationsModule
     CollapsibleModule,
     ModalModule.forRoot()
     ],
     declarations: [
     AdminComponent,
     DashboardComponent,
     AppFooterComponent,
     AppHeaderComponent,
     AppSidebarComponent,
     BottomChatComponent,
     TraindomainComponent,
     // AsideToggleDirective,
     // NAV_DROPDOWN_DIRECTIVES,
     /*ReplaceDirective,*/
     AddtaskComponent,
     BottrainingComponent,
     ContextComponent,
     EditContextComponent,
     CreateFlowComponent
     ],
     providers: [{
       provide: LocationStrategy,
       useClass: HashLocationStrategy
     }],
   })
export class AdminModule { }