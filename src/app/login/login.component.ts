import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RepositoryService } from '../shared/services/repository.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private userAuthenticated = false;
  public errorMessage = '';
  constructor(
    private router: Router,
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  public login(form: NgForm) {
    const apiUrl = 'api/auth';
    const credentialsInput = JSON.stringify(form.value);
    this.repository.post(credentialsInput, apiUrl)
    .subscribe(response => {
      const token = (response as any).token;
      localStorage.setItem('jwt', token);
      this.userAuthenticated = true;
      this.router.navigate(['/dashboard']);
    }, error => {
      this.userAuthenticated = false;
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    });
  }

}
