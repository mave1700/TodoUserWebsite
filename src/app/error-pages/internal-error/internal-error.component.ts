import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-internal-error',
  templateUrl: './internal-error.component.html',
  styleUrls: ['./internal-error.component.css']
})
export class InternalErrorComponent implements OnInit {
  public errorMessage = '500 - Server error';
  constructor() { }

  ngOnInit() {
  }
}
