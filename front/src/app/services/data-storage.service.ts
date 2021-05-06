import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CurrentPosition {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor() { }

  // redux du pauvre

  private _currentPosition: BehaviorSubject<CurrentPosition> = new BehaviorSubject({x: 0, y: 0});
  currentPosition: Observable<CurrentPosition> = this._currentPosition.asObservable();

  updateCurrentPosition(pos: CurrentPosition) {
    this._currentPosition.next(pos);
  }


}

