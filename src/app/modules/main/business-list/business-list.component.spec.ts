import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { BusinessListComponent } from './business-list.component';
import { BusinessService } from '../shared/business.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { MainModule } from '../main.module';
import { Business } from '../business-detail/business.model';
import { of } from 'rxjs';

describe('BusinessListComponent', () => {
  // this is one of the ways to access to private methods of a component,
  // you can expose private functions/properties to be accesible from outside
  // or you can access through bracket notation or using the any as the component type
  // I will use this last option.
  let component: any;
  let fixture: ComponentFixture<BusinessListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MainModule,
        SharedModule
      ],
      declarations: [ BusinessListComponent ],
      providers: [ BusinessService ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit function', () => {
    it('should initialize businessListModel$ with the businessService.businessListModel$ value', (done) => {
      const businessList: Business[] = [{
        id: '1',
        image_url: 'image_url.jpg',
        name: 'business name',
        rating: 5
      }];
      component.businessService.businessListModel$ = of(businessList);

      component.ngOnInit();

      component.businessListModel$.subscribe((value) => {
        expect(value).toEqual(businessList);

        done();
      });
    });
  });

  describe('getBusinessReviews function', () => {
    it('should go to the business detail route', () => {
      const businessId = '1';
      spyOn(component.router, 'navigate');

      component.goToBusinessDetail(businessId);

      expect(component.router.navigate).toHaveBeenCalled();
      expect(component.router.navigate).toHaveBeenCalledWith(['/business-detail', businessId]);
    });
  });
});
