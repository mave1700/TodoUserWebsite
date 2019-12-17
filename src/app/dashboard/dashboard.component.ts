import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { User } from '../_interfaces/user.model';
import { RepositoryService } from '../shared/services/repository.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public user: User;

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  ngOnInit() {
    this.getUser();
  }

  private getUser() {
    const apiUrl = 'api/user';
    this.repository.get(apiUrl)
      .subscribe(res => {
        this.user = res as User;
      },
        (error) => {
          this.errorHandler.handleError(error);
        });
  }

  public getDateOfBirth() {
    if (this.user) {
      return formatDate(this.user.dateOfBirth, 'yyyy-MM-dd', this.locale);
    }
  }

}
