import { createReducer, on } from '@ngrx/store';
import { IUserPosition } from 'src/app/types/position';
import { updateAllergies, updatePosition, reverseGeocode, reverseGeocodeFail } from '../actions/user.actions';

type State = {allergies: string, position: IUserPosition, reverseGeocoding: boolean};

export const initialState: State = {allergies: "", position: {lat: 0, lon: 0}, reverseGeocoding: false};

const _userReducer = createReducer(
  initialState,
  on(updatePosition, (state, action) => { return {...state, position: action.userPosition, reverseGeocoding: false}}),
  on(updateAllergies, (state, action) => { return {...state, allergies: action.allergies}}),
  on(reverseGeocode, (state, _) => {return {...state, reverseGeocoding: true}}),
  on(reverseGeocodeFail, (state, _) => {return {...state, reverseGeocoding: false}})
);

export const userReducer = (state, action) => {
  return _userReducer(state, action);
}
