import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateAllergies, updatePosition } from 'src/app/store/actions/user.actions';
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

  constructor(private reverseGeocode: ReverseGeocodingService, private store: Store<IUserPosition>) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.store.dispatch(updatePosition({userPosition: {lat: position.coords.latitude, lon: position.coords.longitude}}))
    }, (error) => console.log(error));
  }

  search() {
    if (this.address.trim().length > 0) {
      this.reverseGeocode.findNearAddress(this.address).subscribe((values) => {
        if (values && values.features.length > 0) {
          const first = values.features[0];
          const geometry = first.geometry as any;
          const coords = geometry.coordinates;
          this.store.dispatch(updatePosition({userPosition: {lat: coords[1], lon: coords[0]}}))
        }
      });
    }
  }

  updateAllergies() {
    this.store.dispatch(updateAllergies({allergies: this.allergies}))
  }
}
