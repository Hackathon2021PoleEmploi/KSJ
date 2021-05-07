import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, concatLatestFrom } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
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
      //tap(([action, user]) => {
      //    const {allergies, position} = user;
      //    this.treesService.findNearCoords(position.lat, position.lon, allergies).pipe(
      //      map(trees => nearestTreesSuccess({trees})),
      //      catchError(error => of(nearestTreesFail({error})))
      //    );
      //})

  getNearestTrees$ = createEffect(() => this.actions$.pipe(
    ofType(nearestTrees),
    exhaustMap(() => this.store.select((state) => state.user).pipe(
      tap((user) => {
        const {allergies, position} = user;
        this.treesService.findNearCoords(position.lat, position.lon, allergies).pipe(
          map(trees => nearestTreesSuccess({trees})),
          catchError(error => of(nearestTreesFail({error})))
        );
      })
    )
    )))

    //this.actions$.pipe(
    //  ofType(nearestTrees),
    //  concatLatestFrom(action => this.store.select((state) => state.user))
    //)

  constructor(
    private actions$: Actions,
    private treesService: TreesService,
    private store: Store<any> // XXX TODO type
  ) {}
}
