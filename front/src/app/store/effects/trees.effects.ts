import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { topGenres, topGenresFail, topGenresSuccess, nearestTrees, nearestTreesFail, nearestTreesSuccess } from "../actions/tree.actions"
import { TreesService } from 'src/app/services/trees.service';
import { Store } from '@ngrx/store';

@Injectable()
export class TreesEffects {
  reverseGeocode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(topGenres),
      exhaustMap(action =>
        this.treesService.getTopGenres().pipe(
          map(values => {
            if (values && values.length > 0) {
              return topGenresSuccess({results: values});
            } else {
              return topGenresFail({payload: "no genres found"});
            }
          }),
          catchError(error => of(topGenresFail({payload: error})))
        )
      )
    )
  );

    nearestTrees$ = createEffect(() =>
        this.actions$.pipe(
          ofType(nearestTrees),
          withLatestFrom(this.store.select((s) => s.user)),
          mergeMap(([action, user]) => {
            const {allergies, position} = user;
            return this.treesService.findNearCoords(position.lon, position.lat, allergies)
              .pipe(
                map(trees => nearestTreesSuccess({trees})),
                catchError(error => of(nearestTreesFail({error})))
              );
          })
    ));

  constructor(
    private actions$: Actions,
    private treesService: TreesService,
    private store: Store<any> // XXX TODO type
  ) {}
}
