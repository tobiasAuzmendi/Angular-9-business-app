import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';

@Pipe({
  name: 'requestStatus',
})
export class RequestStatusPipe implements PipeTransform {

  transform(val) {
    return isObservable(val) ? val.pipe(
      map((value: any) => {
        return ({ loading: false, value });
      }),
      startWith({ loading: true }),
      catchError(errorResponse => (of({ loading: false, error:
          errorResponse.message || errorResponse.error && errorResponse.error.error && errorResponse.error.error.description
        })
      ))
    ) : val;
  }

}
