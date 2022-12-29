import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

declare var google;

@Component({
  selector: 'app-driver',
  templateUrl: 'driver.page.html',
  styleUrls: ['driver.page.scss'],
})
export class Driver implements OnInit, AfterViewInit {
  @ViewChild('mapElement') mapNativeElement: ElementRef;
  directionsService = new google.maps.DirectionsService();
  // directionsRender = new google.maps.DirectionsRenderer();
  map: any;
  directionsRender: any = new google.maps.DirectionsRenderer();

  constructor() {}

  async ngOnInit() {
    this.getCurrentPosition();
  }

  ngAfterViewInit(): void {
    console.log(this.mapNativeElement.nativeElement);
    this.map = new google.maps.Map(this.mapNativeElement.nativeElement, {
      zoom: 9,
      center: { lat: -6.4534705, lng: 110.8824043 },
    });
    // this.directionsRender.setMap(map);
    // this.directionsRender.setOptions({
    //   preserveViewport: true,
    // });

    this.directionsRender.setOptions({
      map: this.map,
      preserveViewport: true, //Added to preserve viewport
      // draggable: false,
      // suppressMarkers: true,
      markerOptions: {
        // icon: 'https://cdn.iconscout.com/icon/free/png-256/google-maps-2981836-2476488.png',
      },
    });
    this.calculateAndDisplayRoute();
  }

  calculateAndDisplayRoute() {
    this.directionsService.route(
      {
        origin: '-6.4534705, 110.8824043',
        destination: '-6.991763636517217, 110.4226536577639',
        travelMode: 'DRIVING',
      },
      (response, status) => {
        if (status === 'OK') {
          this.directionsRender.setDirections(response);
          this.map.setCenter({
            lat: -6.991763636517217,
            lng: 110.4226536577639,
          });
          // var leg = response.routes[0].legs[0];
          // this.makeMarker(leg.start_location, icons.start, "title", map);
          // this.makeMarker(leg.end_location, '/assets/export-figma/TabsMenu/Icon/maintenance.png', 'title', this.map);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }

  makeMarker(position, icon, title, map) {
    new google.maps.Marker({
      position: position,
      map: map,
      icon: icon,
      title: title,
    });
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log(coordinates);
  }
}
