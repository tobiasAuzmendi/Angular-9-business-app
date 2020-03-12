import { RequestStatusPipe } from './request-status.pipe';
import { of, throwError, Observable } from 'rxjs';
import { skip } from 'rxjs/operators';

describe('RequestStatusPipe', () => {
  let pipe: RequestStatusPipe;

  beforeEach(() => {
    pipe = new RequestStatusPipe();
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform function', () => {
    it('should return direct value passed as parameter if value is not an observable', () => {
      const val = {
        prop: 'some value'
      };
      const transformResponse = pipe.transform(val);

      expect(transformResponse).toBe(val);
    });

    it('should start with loading in true', (done) => {
      const transformResponse = pipe.transform(new Observable());

      transformResponse.subscribe((value) => {
        expect(value).toEqual({
          loading: true
        });

        done();
      });
    });

    it('should return the observable parameter resolved value and a loading flag in false when we pass an observable', (done) => {
      const valObject = {
        prop: 'some value'
      };
      const valObservable = of(valObject);
      const transformResponse = pipe.transform(valObservable);

      transformResponse.pipe(skip(1)).subscribe((value) => {
        expect(value).toEqual({
          value: valObject,
          loading: false
        });

        done();
      });
    });

    it('should return the loading flag in false and an error message when the observable fails with an error message', (done) => {
      const errorObject = {
        message: 'the backend code is not good enough'
      };
      const transformResponse = pipe.transform(throwError(errorObject));

      transformResponse.pipe(skip(1)).subscribe((value) => {
        expect(value).toEqual({
          error: errorObject.message,
          loading: false
        });

        done();
      });
    });

    it('should return the loading flag in false and an error message when the observable fails with an api error object', (done) => {
      const errorObject = {
        error: {
          error: {
            description: 'the backend code is not good enough'
          }
        }
      };
      const transformResponse = pipe.transform(throwError(errorObject));

      transformResponse.pipe(skip(1)).subscribe((value) => {
        expect(value).toEqual({
          error: errorObject.error.error.description,
          loading: false
        });

        done();
      });
    });
  });

});
