import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mapCenter = [-118.821527826096, 34.0139576938577];
  basemapType = 'hybrid';
  mapZoomLevel = 10
  groundtype = "world-elevation"

  mapLoadedEvent(status: boolean) {
    console.log('The map has loaded: ' + status);
  }
}
