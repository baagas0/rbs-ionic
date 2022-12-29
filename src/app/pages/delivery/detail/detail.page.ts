import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { RestService } from 'src/app/services/rest.service';

declare var google;

@Component({
  selector: 'app-detail',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss'],
})
export class Detail implements OnInit, AfterViewInit {
  @ViewChild('mapElement') mapNativeElement: ElementRef;
  directionsService = new google.maps.DirectionsService();
  // directionsRender = new google.maps.DirectionsRenderer();
  map: any;
  detail: any = {};
  directionsRender: any = new google.maps.DirectionsRenderer();

  constructor(
    private router: Router,
    private restService: RestService,
    private activeRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.getCurrentPosition();
  }

  ngAfterViewInit(): void {
    // console.log(this.mapNativeElement.nativeElement);
    // this.getData();

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
  }

  ionViewDidEnter() {
    this.getData();
  }

  getData() {
    let uri = `view/deliveries/${this.activeRoute.snapshot.queryParams.id}`;

    this.restService.getting(uri, {}).then((res) => {
      this.detail = res.data;
      // console.log(this.detail);
      this.calculateAndDisplayRoute();
    });
  }

  calculateAndDisplayRoute() {
    console.log(this.detail);

    this.directionsService.route(
      {
        origin: `${this.detail.production_unit_id_latitude},${this.detail.production_unit_id_longitude}`,
        // origin: `-7.181529036064146,110.4247272988701`,
        destination: `${this.detail.customer_project_id_latitude},${this.detail.customer_project_id_longitude}`,
        travelMode: 'DRIVING',
      },
      (response, status) => {
        if (status === 'OK') {
          this.directionsRender.setDirections(response);
          this.map.setCenter({
            lat: this.detail.customer_project_id_latitude,
            lng: this.detail.customer_project_id_longitude,
          });
          this.map.setZoom(7);
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

  go(to) {
    this.router.navigate([to]);
  }
}
