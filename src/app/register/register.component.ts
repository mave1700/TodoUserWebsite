import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RepositoryService } from '../shared/services/repository.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserForCreation } from '../_interfaces/user-for-creation.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../shared/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public minDate: Date;
  public maxDate: Date;

  constructor(
    private router: Router,
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    this.minDate = new Date(currentYear - 120, 0, 1);
    this.maxDate = new Date(currentYear - 2, currentMonth, currentDate);
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required, Validators.maxLength(45), Validators.minLength(3)])],
      lastname: ['', Validators.compose([Validators.required, Validators.maxLength(45), Validators.minLength(3)])],
      dateOfBirth: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(3)])]
    });
  }

  public validateControl(controlName: string) {
    if (this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.registerForm.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  private handleFailedRegistration(error: HttpErrorResponse) {
    this.errorHandler.handleError(error);
  }

  public register(formValue: any) {
    if (this.registerForm.valid) {
      this.sendRegisterForm(formValue);
    }
  }

  public sendRegisterForm(formValue: any) {
    const userInput: UserForCreation = {
      firstname: formValue.firstname,
      lastname: formValue.lastname,
      dateOfBirth: formValue.dateOfBirth,
      username: formValue.username,
      password: formValue.password
    };
    console.log(userInput);
    const apiUrl = 'api/user';
    const userInputString = JSON.stringify(userInput);

    this.repository.post(apiUrl, userInputString)
      .subscribe(response => {
        const config = new MatDialogConfig();
        config.hasBackdrop = true;
        config.data = {
          headerText: 'Registrering slutförd',
          bodyText: 'Du är nu medlem på TodoSite!'
        };
        this.dialog.open(SuccessDialogComponent, config);
        this.router.navigate(['/home']);
      }, error => {
        if (error.status === 409) {
          const config = new MatDialogConfig();
          config.hasBackdrop = true;
          config.data = {
            headerText: 'Ett fel uppstod',
            bodyText: 'Användarnamnet existerar redan. Vänligen välj ett annat och försök igen.'
          };
          this.dialog.open(SuccessDialogComponent, config);
        } else {
          this.handleFailedRegistration(error);
        }
      });
  }


}
