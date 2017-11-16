import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { DashboardUserRoutingModule } from './dashboard-user-routing.module';
import { DashboardUserComponent } from './dashboard-user.component';
import {HttpModule} from '@angular/http';
@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        DashboardUserRoutingModule,
       FormsModule
    ],
    declarations: [
    DashboardUserComponent
    ],
    providers : []
})
export class DashboardUserModule { }
