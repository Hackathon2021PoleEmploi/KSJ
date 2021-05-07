import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { reverseGeocode, reverseGeocodeFail, reverseGeocodeSuccess, updatePosition } from '../actions/user.actions'
import { ReverseGeocodingService} from '../../services/reverse-geocoding.service';

@Injectable()
export class GeocodingEffects {
  reverseGeocode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reverseGeocode),
      exhaustMap(action =>
        this.geocodingService.findNearAddress(action.query).pipe(
          map(values => {
            if (values && values.features.length > 0) {
              const first = values.features[0];
              const geometry = first.geometry as any;
              const coords = geometry.coordinates;
              return updatePosition({userPosition: {lat: coords[1], lon: coords[0]}});
            } else {
              return reverseGeocodeFail({payload: "no position found"});
            }
          }),
          catchError(error => of(reverseGeocodeFail({payload: error})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private geocodingService: ReverseGeocodingService
  ) {}
}
