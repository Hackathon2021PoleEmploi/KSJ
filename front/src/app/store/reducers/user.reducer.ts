import { createReducer, on } from '@ngrx/store';
import { IUserPosition } from 'src/app/types/position';
import { updateAllergies, updatePosition } from '../actions/user.actions';

type State = {allergies: string, position: IUserPosition};

export const initialState: State = {allergies: "", position: {lat: 0, lon: 0}};

const _userReducer = createReducer(
  initialState,
  on(updatePosition, (state, action) => { return {...state, position: action.userPosition}}),
  on(updateAllergies, (state, action) => { return {...state, allergies: action.allergies}})
);

export const userReducer = (state, action) => {
  return _userReducer(state, action);
}
