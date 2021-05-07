import { createAction, props } from '@ngrx/store';
import { FeatureCollection } from 'geojson';
import { IUserPosition } from '../../types/position';

export const updatePosition = createAction('USER/UPDATE_POSITION', props<{userPosition: IUserPosition}>());
export const updateAllergies = createAction('USER/UPDATE_ALLERGIES', props<{allergies: string}>());

export const reverseGeocode = createAction('REVERSE_GEOCODE', props<{query: string}>())
export const reverseGeocodeSuccess = createAction('REVERSE_GEOCODE/SUCCESS', props<{results: FeatureCollection}>())
export const reverseGeocodeFail = createAction('REVERSE_GEOCODE/FAIL', props<{payload: any}>())
