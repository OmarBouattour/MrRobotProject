import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserinterfaceComponent } from './userinterface/userinterface.component';
import { AdmininterfaceComponent } from './admininterface/admininterface.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { StatisticsComponent } from './statistics/statistics.component';
import { ReportsComponent } from './reports/reports.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import {MatExpansionModule } from '@angular/material/expansion';
//import { MatSliderModule } from '@angular/material/slider';
import { ModalModule } from 'ngx-bootstrap/modal';

//import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AuthloginGuard } from './authlogin.guard';
import { ChartsModule } from 'ng2-charts';
import { AllstatsComponent } from './allstats/allstats.component';
import { ExecutionsComponent } from './executions/executions.component';
import { AddtestcaseComponent } from './addtestcase/addtestcase.component';
import { RestoretestcaseComponent } from './restoretestcase/restoretestcase.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { WritetestComponent } from './writetest/writetest.component';
import { FileSaverModule } from 'ngx-filesaver';
import { AdduserComponent } from './adduser/adduser.component';
//import { AceEditorModule } from 'ng2-ace-editor';

//import { MonacoEditorModule } from 'ngx-monaco-editor';
import { JwPaginationModule } from 'jw-angular-pagination';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserinterfaceComponent,
    AdmininterfaceComponent,
    HeaderComponent,
    FooterComponent,
    StatisticsComponent,
    ReportsComponent,
    AllstatsComponent,
    ExecutionsComponent,
    AddtestcaseComponent,
    RestoretestcaseComponent,
    WritetestComponent,
    AdduserComponent,
   // JwPaginationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    FileSaverModule ,
    JwPaginationModule,
    CodemirrorModule
    //MonacoEditorModule.forRoot()
    //AceEditorModule,
    //CollapseModule.forRoot(),
    //MatExpansionModule,
   // MatSliderModule,
  ],
  providers: [AuthService, AuthGuard, AuthloginGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
