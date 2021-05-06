import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feature } from 'geojson';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TreesService {
  constructor(private http: HttpClient) { }

  getDomain() {
    return environment.production ? "https://back.traefik.me/api/" : "/api/";
  }

  findNearCoords(x: number, y: number): Observable<Array<Feature>> {
    const params = {x, y};
    return this.http.get<Array<Feature>>(`${this.getDomain()}Check`, {params});
  }
}

