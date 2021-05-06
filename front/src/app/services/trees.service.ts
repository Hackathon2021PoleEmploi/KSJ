import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TreesService {
  constructor(private http: HttpClient) { }

  getDomain() {
    return environment.production ? "https://back.traefik.me/api/" : "/api/";
  }

  findNearCoords(xn: number, yn: number) {
    const params = {x: xn.toString(), y: yn.toString()};
    return this.http.get<any>(`${this.getDomain()}Check`, {params});
  }
}

