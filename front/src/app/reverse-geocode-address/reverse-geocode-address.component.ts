import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { ReverseGeocodingService } from '../services/reverse-geocoding.service';

@Component({
  selector: 'app-reverse-geocode-address',
  templateUrl: './reverse-geocode-address.component.html',
  styleUrls: ['./reverse-geocode-address.component.css']
})
export class ReverseGeocodeAddressComponent implements OnInit {

  address: string = "";

  constructor(private reverseGeocode: ReverseGeocodingService, private dataService: DataStorageService) { }

  ngOnInit(): void {
  }

  search() {
    if (this.address.trim().length > 0) {
      this.reverseGeocode.findNearAddress(this.address).subscribe((values) => {
        console.log(values);
        if (values && values.features.length > 0) {
          const first = values.features[0];
          const geometry = first.geometry as any;
          const coords = geometry.coordinates;
          this.dataService.updateCurrentPosition({x: coords[1], y: coords[0]});
        }
      });
    }
  }
}
