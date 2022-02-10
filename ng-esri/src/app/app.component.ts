import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mapCenter = [22.735956, 75.863713];
  basemapType = 'hybrid';
  mapZoomLevel = 10
  groundtype = "world-elevation"

  mapLoadedEvent(status: boolean) {
    console.log('The map has loaded: ' + status);
  }
}
