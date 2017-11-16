import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { AddtaskComponent } from './addtask/addtask.component';
import {BottrainingComponent} from './bottraining/bottraining.component';
import {TraindomainComponent} from './traindomain/traindomain.component';
import { CreateFlowComponent } from './create-flow/create-flow.component';


const routes: Routes = [
{
	path: '', component: AdminComponent,
	children: [
	{
		path: 'dashboardAdmin', component: DashboardComponent
	}]
},
{
	path: '', component: AdminComponent,
	children: [
	{
		path : 'traindomain/:name/:op', component : TraindomainComponent
	}]
},

{
	path: '', component: AdminComponent,
	children: [
	{
		path : 'createflow', component : CreateFlowComponent
	}]
},

{
	path: '', component: AdminComponent,
	children: [
	{
		path:'trainingbot' ,component:BottrainingComponent
	}]
},

{
	path: '', component: AdminComponent,
	children: [
	{
		path: 'dashboardAdmin/addtask', component: AddtaskComponent
	}]
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }


