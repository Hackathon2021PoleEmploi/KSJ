import { createReducer, on } from '@ngrx/store';
import { topGenres, topGenresFail, topGenresSuccess } from "../actions/tree.actions"

type State = {topGenres: string[], fetchingTopGenres: boolean};

export const initialState: State = {topGenres: [], fetchingTopGenres: false};

const _treesReducer = createReducer(
  initialState,
  on(topGenres, (state, _) => {return {...state, fetchingTopGenres: true}}),
  on(topGenresSuccess, (state, action) => {return {...state, fetchingTopGenres: false, topGenres: action.results}}),
  on(topGenresFail, (state, _) => {return {...state, fetchingTopGenres: false}})
);

export const treesReducer = (state, action) => {
  return _treesReducer(state, action);
}
