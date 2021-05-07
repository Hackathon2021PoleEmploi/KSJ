import { createReducer, on } from '@ngrx/store';
import { Feature } from 'geojson';
import { topGenres, topGenresFail, topGenresSuccess, nearestTreesSuccess } from "../actions/tree.actions"

type State = {topGenres: string[], fetchingTopGenres: boolean, trees: Array<Feature>};

export const initialState: State = {topGenres: [], fetchingTopGenres: false, trees: []};

const _treesReducer = createReducer(
  initialState,
  on(topGenres, (state, _) => {return {...state, fetchingTopGenres: true}}),
  on(topGenresSuccess, (state, action) => {return {...state, fetchingTopGenres: false, topGenres: action.results}}),
  on(topGenresFail, (state, _) => {return {...state, fetchingTopGenres: false}}),
  on(nearestTreesSuccess, (state, action) => {return {...state, trees: action.trees}})
);

export const treesReducer = (state, action) => {
  return _treesReducer(state, action);
}
