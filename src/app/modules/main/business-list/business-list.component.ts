import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../shared/business.service';
import { Observable } from 'rxjs';
import { Business } from '../business-detail/business.model';
import { Router } from '@angular/router';

@Component({
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {
  businessListModel$: Observable<Business[]>;

  constructor(
    private businessService: BusinessService,
    private router: Router
  ) {}

  ngOnInit() {
    this.businessListModel$ = this.businessService.businessListModel$;
  }

  goToBusinessDetail(businessId: string): void {
    this.router.navigate(['/business-detail', businessId]);
  }
}
