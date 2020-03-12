import { TestBed, async, getTestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Business, BusinessListResponse, BusinessReview, User, BusinessReviewsResponse } from '../business-detail/business.model';
import { BusinessService } from './business.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BusinessService', () => {
  let service: BusinessService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        BusinessService
      ]
    }).compileComponents();

    service = TestBed.get(BusinessService);
    const injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('getBusinessList function', () => {
    it('should return a business list observable', (done) => {
      const businessList: Business[] = [{
        id: '1',
        image_url: 'image_url.jpg',
        name: 'business name',
        rating: 5
      }];
      const businessListResponse: BusinessListResponse = {
        businesses: businessList,
        total: 10,
        region: {
          center: {
            longitude: 35,
            latitude: 35
          }
        }
      };

      const businessListObservable = service.getBusinessList();

      businessListObservable.subscribe((value) => {
        expect(value).toEqual(businessList);

        done();
      });

      const req = httpMock.expectOne('/v3/businesses/search?location=New York City');
      expect(req.request.method).toBe('GET');
      req.flush(businessListResponse);
    });
  });

  describe('getBusinessInformation function', () => {
    it('should return a business observable', (done) => {
      const business: Business = {
        id: '1',
        image_url: 'image_url.jpg',
        name: 'business name',
        rating: 5
      };
      const businessId = '1';

      const businessObservable = service.getBusinessInformation(businessId);

      businessObservable.subscribe((value) => {
        expect(value).toEqual(business);

        done();
      });

      const req = httpMock.expectOne(`/v3/businesses/${businessId}`);
      expect(req.request.method).toBe('GET');
      req.flush(business);
    });
  });

  describe('getBusinessReviews function', () => {
    it('should return a business review list observable', (done) => {
      const user: User = {
        id: '1',
        profile_url: 'profile_url.jpg',
        image_url: 'image_url.jpg',
        name: 'John Doe'
      };
      const reviews: BusinessReview[] = [{
        id: '1',
        url: 'image_url.jpg',
        text: 'A great place',
        rating: 4,
        time_created: '2018-02-10T04:39:43.829Z',
        user
      }];
      const businessReviewsResponse: BusinessReviewsResponse = {
        reviews,
        total: 10,
        possible_languages: ['en']
      };
      const businessId = '1';

      const reviewsObservable = service.getBusinessReviews(businessId);

      reviewsObservable.subscribe((value) => {
        expect(value).toEqual(reviews);

        done();
      });

      const req = httpMock.expectOne(`/v3/businesses/${businessId}/reviews`);
      expect(req.request.method).toBe('GET');
      req.flush(businessReviewsResponse);
    });
  });
});
