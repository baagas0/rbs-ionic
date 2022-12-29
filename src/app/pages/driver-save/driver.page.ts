import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
// declare var google : google;
import { CallbackID, Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-driver',
  templateUrl: 'driver.page.html',
  styleUrls: ['driver.page.scss'],
})
export class Driver {
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  apiKey: string = 'AIzaSyBQyCUJ93pD6_SL-1WVkZxuDqiqu4_8bHI';
  newMap: GoogleMap;
  lat: number;
  lng: number;
  geoConfig: any = {
    enableHighAccuracy: true,
    timeout: 7500,
    maximumAge: 100,
  };
  watchId: any;

  constructor(public ngZone: NgZone) {}

  async ngOnInit() {
    // await this.mapInit();
    await this.watchPosition();
  }

  async ngAfterViewInit() {
    await this.getCurrentPosition();
    await this.mapInit();
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.lat = coordinates.coords.latitude;
    this.lng = coordinates.coords.longitude;
  }

  async watchPosition() {
    try {
      this.watchId = Geolocation.watchPosition(
        this.geoConfig,
        (position, err) => {
          if (err) {
            console.log('err', err);
            return;
          }
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.clearWatch();
          console.log(this.lat);
        }
      );
    } catch (err) {
      console.log('err', err);
    }
  }

  clearWatch() {
    if (this.watchId != null) {
      Geolocation.clearWatch({ id: this.watchId });
    }
  }

  async mapInit() {
    this.newMap = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: this.mapRef.nativeElement, // reference to the capacitor-google-map element
      apiKey: this.apiKey, // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: this.lat,
          lng: this.lng,
        },
        zoom: 12, // The initial zoom level to be rendered by the map
      },
    });

    await this.mapAddMarker(this.lat, this.lng);
  }

  async mapAddMarker(lat, lng) {
    await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng,
      },
    });
  }
}
