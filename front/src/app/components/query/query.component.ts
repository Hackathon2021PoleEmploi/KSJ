import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { reverseGeocode, updateAllergies, updatePosition } from 'src/app/store/actions/user.actions';
import { IUserPosition } from 'src/app/types/position';
import { ReverseGeocodingService } from '../../services/reverse-geocoding.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {

  address: string = "";
  allergies: string = "";

  isGeocoding$: Observable<boolean>;

  constructor(private store: Store<any>) {
    this.isGeocoding$ = store.select((s) => s.user.reverseGeocoding);
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.store.dispatch(updatePosition({userPosition: {lat: position.coords.latitude, lon: position.coords.longitude}}))
    }, (error) => console.log(error));
  }

  search() {
    if (this.address.trim().length > 0) {
      this.store.dispatch(reverseGeocode({query: this.address}));
    }
  }

  updateAllergies() {
    this.store.dispatch(updateAllergies({allergies: this.allergies}))
  }
}
