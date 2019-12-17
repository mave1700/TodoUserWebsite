import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

  public dialogHeaderText: string;
  public dialogBodyText: string;

  constructor(
    private dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.dialogHeaderText = data.headerText;
    this.dialogBodyText = data.bodyText;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
