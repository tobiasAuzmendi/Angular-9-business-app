import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
  // this is one of the ways to access to private methods of a component,
  // you can expose private functions/properties to be accesible from outside
  // or you can access through bracket notation or using the any as the component type
  // I will use this last option.
  let component: any;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit function', () => {
    it('should call mapRatingToArray method and initialize ratingRange array', () => {
      const mapRatingToArrayReturnValue = [true, true, true, true, false];
      spyOn(component, 'mapRatingToArray').and.returnValue(mapRatingToArrayReturnValue);

      component.rating = 4;

      component.ngOnInit();

      expect(component.mapRatingToArray).toHaveBeenCalled();
      expect(component.ratingRange).toEqual(mapRatingToArrayReturnValue);
    });
  });

  describe('mapRatingToArray function', () => {
    it('should return an array of booleans with as many true values as the rating value that enters as parameter', () => {
      let mapRatingToArrayResponse = component.mapRatingToArray(1);
      expect(mapRatingToArrayResponse).toEqual([true, false, false, false, false]);

      mapRatingToArrayResponse = component.mapRatingToArray(2);
      expect(mapRatingToArrayResponse).toEqual([true, true, false, false, false]);

      mapRatingToArrayResponse = component.mapRatingToArray(3);
      expect(mapRatingToArrayResponse).toEqual([true, true, true, false, false]);

      mapRatingToArrayResponse = component.mapRatingToArray(4);
      expect(mapRatingToArrayResponse).toEqual([true, true, true, true, false]);

      mapRatingToArrayResponse = component.mapRatingToArray(5);
      expect(mapRatingToArrayResponse).toEqual([true, true, true, true, true]);
    });
  });
});
