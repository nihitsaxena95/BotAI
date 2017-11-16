import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardUserComponent } from './dashboard-user.component';

const routes: Routes = [
{ path: '', component: DashboardUserComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardUserRoutingModule { }
