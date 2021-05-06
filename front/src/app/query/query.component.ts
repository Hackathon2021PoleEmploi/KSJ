import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { ReverseGeocodingService } from '../services/reverse-geocoding.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {

  address: string = "";
  allergies: string = "";

  constructor(private reverseGeocode: ReverseGeocodingService, private dataService: DataStorageService) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.dataService.updateCurrentPosition({x: position.coords.latitude, y: position.coords.longitude});
    }, (error) => console.log(error));
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
