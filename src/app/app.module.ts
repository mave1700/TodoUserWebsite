import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeSV from '@angular/common/locales/sv';
registerLocaleData(localeSV, 'sv');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { InternalErrorComponent } from './error-pages/internal-error/internal-error.component';
import { ErrorDialogComponent } from './shared/dialogs/error-dialog/error-dialog.component';
import { UserTasksComponent } from './dashboard/user-tasks/user-tasks.component';
import { SuccessDialogComponent } from './shared/dialogs/success-dialog/success-dialog.component';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    InternalErrorComponent,
    UserTasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:44341'],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [{provide: LOCALE_ID, useValue: 'sv'}],
  bootstrap: [AppComponent],
  entryComponents: [ErrorDialogComponent, SuccessDialogComponent]
})
export class AppModule { }
