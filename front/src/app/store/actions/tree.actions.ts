import { createAction, props } from '@ngrx/store';

export const topGenres = createAction('TREES/GET_TOP_GENRES')
export const topGenresSuccess = createAction('TREES/GET_TOP_GENRES/SUCCESS', props<{results: string[]}>())
export const topGenresFail = createAction('TREES/GET_TOP_GENRES/FAIL', props<{payload: any}>())

export const nearestTrees = createAction('TREES/GET_NEAREST');
export const nearestTreesSuccess = createAction('TREES/GET_NEAREST_SUCCESS', props<{trees: any}>());
export const nearestTreesFail = createAction('TREES/GET_NEAREST_FAIL', props<{error: any}>());
