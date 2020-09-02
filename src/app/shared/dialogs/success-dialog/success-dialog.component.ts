import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent implements OnInit {

  public dialogHeaderText: string;
  public dialogBodyText: string;

  constructor(
    private dialogRef: MatDialogRef<SuccessDialogComponent>,
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
