import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeatureCollection } from 'geojson';
import * as mapboxgl from 'mapbox-gl';
import { Observable } from 'rxjs';
import { IUserPosition } from 'src/app/types/position';

const currentPositionAsFeatColl = (x: number, y: number): FeatureCollection => {
  return {
    type: 'FeatureCollection',
    "features": [
      { "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [y, x]
        },
        "properties": {
          "prop0": "value0"
        }
      },
    ]
  };
}

const treesAsFeatColl = (payload: any): FeatureCollection => {
  return {
    type: 'FeatureCollection',
    "features": payload
  };
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map!: mapboxgl.Map;
  currentUserPosition$: Observable<IUserPosition>;
  currentTrees$: Observable<any>;
  userPosition: FeatureCollection | undefined;
  trees: FeatureCollection | undefined;

  constructor(private store: Store<any>) {  // XXX TODO type
      this.currentUserPosition$ = store.select((s) => s.user.position)
      this.currentTrees$ = store.select((s) => s.trees.trees)
  }

  ngOnInit() {
    this.currentUserPosition$.subscribe((value) => {
      if (value.lat > 0 && value.lon > 0) {
        this.map.setCenter({lat: value.lat, lng: value.lon})
        this.userPosition = currentPositionAsFeatColl(value.lat, value.lon);
      }
    })
    this.currentTrees$.subscribe((trees) => {
      this.trees = trees;
    })
  }
}
