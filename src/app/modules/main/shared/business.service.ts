import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Business, BusinessListResponse, BusinessReviewsResponse, BusinessReview } from '../business-detail/business.model';
import { map } from 'rxjs/operators';

@Injectable()
export class BusinessService {

  businessListModel$: Observable<Business[]>;

  constructor(private httpClient: HttpClient) {
    this.businessListModel$ = this.getBusinessList();
  }

  getBusinessList(): Observable<Business[]> {
    return this.httpClient.get<BusinessListResponse>('/v3/businesses/search?location=New York City')
    .pipe(map((response: BusinessListResponse) => response.businesses.map(business => ({
        id: business.id,
        image_url: business.image_url,
        name: business.name,
        rating: business.rating
      }))
    ));
  }

  getBusinessInformation(businessId: string): Observable<Business> {
    return this.httpClient.get<Business>(`/v3/businesses/${businessId}`);
  }

  getBusinessReviews(businessId: string): Observable<BusinessReview[]> {
    return this.httpClient.get<BusinessReviewsResponse>(`/v3/businesses/${businessId}/reviews`)
    .pipe(map((response: BusinessReviewsResponse) => response.reviews));
  }

}
