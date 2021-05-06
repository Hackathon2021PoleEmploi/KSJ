import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReverseGeocodeAddressComponent } from './reverse-geocode-address.component';

describe('ReverseGeocodeAddressComponent', () => {
  let component: ReverseGeocodeAddressComponent;
  let fixture: ComponentFixture<ReverseGeocodeAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReverseGeocodeAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReverseGeocodeAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
