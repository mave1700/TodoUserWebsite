import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RepositoryService } from '../shared/services/repository.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { Login } from '../_interfaces/login.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ErrorDialogComponent } from '../shared/dialogs/error-dialog/error-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(3)])]
    });
  }

  public validateControl(controlName: string) {
    if (this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.loginForm.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  public handleFailedLogin(error: HttpErrorResponse) {
    let errorText: string;
    if (error.status === 401) {
      errorText = 'Fel användarnamn och/eller lösnord. Vänligen pröva igen.';
      const config = new MatDialogConfig();
      config.hasBackdrop = true;
      config.data = {
        headerText: 'Inloggningen misslyckades',
        bodyText: errorText
      };
      this.dialog.open(ErrorDialogComponent, config);
    } else {
      this.errorHandler.handleError(error);
    }


  }

  public login(formValue: any) {
    if (this.loginForm.valid) {
      this.sendLoginForm(formValue);
    }
  }

  public sendLoginForm(formValue: any) {
    const credentialsInput: Login = {
      username: formValue.username,
      password: formValue.password
    };
    const apiUrl = 'api/auth/login';
    const credentialsString = JSON.stringify(credentialsInput);
    this.repository.post(apiUrl, credentialsString)
      .subscribe(response => {
        const token = (response as any).token;
        localStorage.setItem('jwt', token);
        this.router.navigate(['/dashboard']);
      }, error => {
        this.handleFailedLogin(error);
      });
  }

}
