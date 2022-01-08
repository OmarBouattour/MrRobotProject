import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddtestcaseComponent } from './addtestcase/addtestcase.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AdmininterfaceComponent } from './admininterface/admininterface.component';
import { AllstatsComponent } from './allstats/allstats.component';
import { AuthGuard } from './auth.guard';
import { AuthloginGuard } from './authlogin.guard';
import { ExecutionsComponent } from './executions/executions.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReportsComponent } from './reports/reports.component';
import { RestoretestcaseComponent } from './restoretestcase/restoretestcase.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UserinterfaceComponent } from './userinterface/userinterface.component';
import { WritetestComponent } from './writetest/writetest.component';


const routes: Routes = [
  {path: '', component: AdmininterfaceComponent,  canActivate: [AuthGuard], pathMatch: 'full'},
  {path: 'home', component: UserinterfaceComponent, canActivate: [AuthGuard]},
  {path: 'adduser', component: AdduserComponent, canActivate: [AuthGuard]},
  {path: 'allstats', component: AllstatsComponent, canActivate: [AuthGuard]},
  {path: 'writetest', component: WritetestComponent, canActivate: [AuthGuard]},
  {path: 'addtestcase', component: AddtestcaseComponent, canActivate: [AuthGuard]},
  {path: 'restoretestcase', component: RestoretestcaseComponent, canActivate: [AuthGuard]},
  {path: 'testcases', component: StatisticsComponent, canActivate: [AuthGuard]},
  {path: 'statistics', component: ExecutionsComponent, canActivate: [AuthGuard]},
  {path: 'executions', component: ExecutionsComponent, canActivate: [AuthGuard]},
  {path: 'reports', component: ReportsComponent, canActivate: [AuthGuard], data: { animation: 'isRight' }},
  {path: 'admin', component: AdmininterfaceComponent, canActivate: [AuthGuard], data: { animation: 'isRight' }},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
