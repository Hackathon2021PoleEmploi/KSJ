import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QueryComponent } from './components/query/query.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule  } from '@angular/material/tooltip'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatChipsModule } from '@angular/material/chips'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component'
import { AlertComponent } from './components/alert/alert.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/reducers/user.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { GeocodingEffects } from './store/effects/geocoding.effects';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { TreesEffects } from './store/effects/trees.effects';
import { treesReducer } from './store/reducers/trees.reducer';

@NgModule({
  declarations: [
    AppComponent,
    QueryComponent,
    MapComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoibWFydGluZmlsbGlhdSIsImEiOiJja29jdzdkMm8wbTFwMm5uMWdoNHhkYzN5In0.JqnjcJ3sQvguHA1tRaNA6A', // Optional, can also be set per map (accessToken input of mgl-map)
      geocoderAccessToken: 'TOKEN' // Optional, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    }),
    StoreModule.forRoot({user: userReducer, trees: treesReducer}),
    EffectsModule.forRoot([GeocodingEffects, TreesEffects]),  // XXX TODO root list effects
    StoreDevtoolsModule.instrument()  // XXX TODO disable in prod
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
