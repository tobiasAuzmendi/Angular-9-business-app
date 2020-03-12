import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { BusinessDetailComponent } from './business-detail.component';
import { Business, BusinessReview, User } from './business.model';
import { of } from 'rxjs';
import { BusinessService } from '../shared/business.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { MainModule } from '../main.module';

describe('BusinessDetailComponent', () => {
  // this is one of the ways to access to private methods of a component,
  // you can expose private functions/properties to be accesible from outside
  // or you can access through bracket notation or using the any as the component type
  // I will use this last option.
  let component: any;
  let fixture: ComponentFixture<BusinessDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MainModule,
        SharedModule
      ],
      declarations: [ BusinessDetailComponent ],
      providers: [ BusinessService ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit function', () => {
    it('should call getBusinessInformation and getBusinessReviews methods. It also should initialize businessDetailModel$', (done) => {
      const businessInformation: Business = {
        id: '1',
        image_url: 'image_url.jpg',
        name: 'business name',
        rating: 5
      };
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

      spyOn(component, 'getBusinessInformation').and.returnValue(of(businessInformation));
      spyOn(component, 'getBusinessReviews').and.returnValue(of(reviews));

      component.ngOnInit();

      expect(component.getBusinessInformation).toHaveBeenCalled();
      expect(component.getBusinessReviews).toHaveBeenCalled();

      component.businessDetailModel$.subscribe((value) => {
        expect(value).toEqual({
          ...businessInformation,
          reviews
        });

        done();
      });
    });
  });

  describe('getBusinessInformation function', () => {
    it('should call businessService.getBusinessInformation method with the correct parameter', () => {
      const businessId = '1';
      spyOn(component.businessService, 'getBusinessInformation');

      component.getBusinessInformation(businessId);

      expect(component.businessService.getBusinessInformation).toHaveBeenCalled();
      expect(component.businessService.getBusinessInformation).toHaveBeenCalledWith(businessId);
    });
  });

  describe('getBusinessReviews function', () => {
    it('should call businessService.getBusinessReviews method with the correct parameter', () => {
      const businessId = '1';
      spyOn(component.businessService, 'getBusinessReviews');

      component.getBusinessReviews(businessId);

      expect(component.businessService.getBusinessReviews).toHaveBeenCalled();
      expect(component.businessService.getBusinessReviews).toHaveBeenCalledWith(businessId);
    });
  });
});
