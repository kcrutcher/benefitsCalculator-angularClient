import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EmployeeBenefitsComponent } from './components/employee-benefits/employee-benefits.component';

import { EmployeesModule } from './modules/employees/employees.module';
import { EmployeesComponent } from './modules/employees/components/employees/employees.component';

import { SettingsModule } from './modules/settings/settings.module';
import { SettingsComponent } from './modules/settings/components/settings/settings.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeBenefitsComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    EmployeesModule,
    SettingsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
