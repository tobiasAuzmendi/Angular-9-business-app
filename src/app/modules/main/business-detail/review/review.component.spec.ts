import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReviewComponent } from './review.component';
import { Review } from './review.model';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    const review: Review = {
      id: '1',
      url: 'url.com',
      text: 'Great place',
      rating: 4,
      time_created: '2018-02-10T04:39:43.829Z',
      user: {
        image_url: 'image_url.com',
        name: 'John Doe'
      }
    };
    component.review = review;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
