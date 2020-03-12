import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../shared/business.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { Business, BusinessReview, BusinessDetail } from './business.model';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit {
  businessDetailModel$: Observable<BusinessDetail>;

  constructor(
    private businessService: BusinessService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.businessDetailModel$ = combineLatest(
      this.getBusinessInformation(this.activatedRoute.snapshot.params.id),
      this.getBusinessReviews(this.activatedRoute.snapshot.params.id)
    ).pipe(map(([businessInformation, businessReviews]) => ({
        ...businessInformation,
        reviews: businessReviews
    })));
  }

  private getBusinessInformation(businessId: string): Observable<Business> {
    return this.businessService.getBusinessInformation(businessId);
  }

  private getBusinessReviews(businessId: string): Observable<BusinessReview[]> {
    return this.businessService.getBusinessReviews(businessId);
  }

}
