import { createAction, props } from '@ngrx/store';
import { IUserPosition } from '../../types/position';

export const updatePosition = createAction('USER/UPDATE_POSITION', props<{userPosition: IUserPosition}>());
export const updateAllergies = createAction('USER/UPDATE_ALLERGIES', props<{allergies: string}>());
