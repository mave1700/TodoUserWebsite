import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public errorMessage = '';

  constructor(
    private router: Router,
    private dialog: MatDialog
    ) { }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 500) {
      this.handle500Error(error);
    } else if (error.status === 404) {
      this.handle404Error(error);
    } else {
      this.handleOtherError(error);
    }
  }

  private handle500Error(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    this.router.navigate(['/500']);
  }

  private handle404Error(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    this.router.navigate(['/404']);
  }

  private openDialog() {
    const config = new MatDialogConfig();
    config.hasBackdrop = true;
    config.data = {
      headerText: 'Ett fel uppstod',
      bodyText: this.errorMessage
    };
    this.dialog.open(ErrorDialogComponent, config);
  }

  private handleOtherError(error: HttpErrorResponse) {
    this.createErrorMessage(error);
    this.openDialog();
  }

  private createErrorMessage(error: HttpErrorResponse) {
    this.errorMessage = error.message ? error.message : error.toString();
  }


}
