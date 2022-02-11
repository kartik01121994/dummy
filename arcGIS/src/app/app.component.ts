
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {loadModules} from 'esri-loader';
import esri = __esri;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('mapView', {static: true})
   private readonly mapViewElement!: ElementRef;
  private mapView : any;

  constructor(){}
    
  async initializeMap() {
    try {
      // setDefaultOptions({ version: '4.13' });
      const [Map, MapView, Graphic, GraphicsLayer, Search] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/widgets/Search",
      ]);



      const mapProperties = {
        basemap: 'gray'
      }
      // create map by default properties
      const map = new Map(mapProperties);
      // set default map view properties
      // container - element in html-template for locate map
      // zoom - default zoom parameter, value from 1 to 18
      const mapViewProperties = {
        container: this.mapViewElement.nativeElement,
        zoom: 3,
        map
      }
      // create map view by default properties
      this.mapView = new MapView(mapViewProperties);
    

      // Add the search widget to the top left corner of the view



    } catch (error) {
      alert('We have an error: ' + error);
    }

  }
  ngOnInit() 
  {
    this.initializeMap();
  }
}
