import { viewClassName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { loadModules } from 'esri-loader';
import * as Polyline from 'esri/geometry/Polyline';
import * as View from 'esri/views/View';
import esri = __esri;

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {
  @Output() mapLoaded = new EventEmitter<boolean>();    
  @ViewChild('mapViewNode', { static: true })
  private mapViewEl!: ElementRef;

  private _zoom: number = 10;
  private _center: Array<number> = [22.735956, 75.863713];
  private _basemap: string = '';
  private _ground : string = "";
  private view : any

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
    
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  @Input()
  set ground(ground: string) {
    this._ground= ground;
  }

  get ground(): string {
    return this._ground;
  }

  constructor() { }

  async initializeMap() {
    try {
      // setDefaultOptions({ version: '4.13' });
      const [esriConfig,EsriMap, EsriMapView, Graphic, GraphicsLayer, Search] = await loadModules([
        "esri/config",
        'esri/Map',
        'esri/views/MapView',
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/widgets/Search"
        
      ]);

      esriConfig.apiKey = "YOUR_API_KEY";

      // Set type of map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap,
        ground : this._ground
      };

      

      const map: esri.Map = new EsriMap(mapProperties);
      
      // Set type of map view
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map,
        
      };


      
      const search = new Search({  //Add Search widget
        View : mapViewProperties
      });

      
      
      
      
      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

      const point = { //Create a point
        type: "point",
        longitude: -118.80657463861,
        latitude: 34.0005930608889
     };
     const simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],  // Orange
        outline: {
            color: [255, 255, 255], // White
            width: 1
        }
     };
    
     const pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol
     });
     graphicsLayer.add(pointGraphic);
    
        // Create a line geometry
     const polyline = {
        type: "polyline",
        paths: [
            [-118.821527826096, 34.0139576938577], //Longitude, latitude
            [-118.814893761649, 34.0080602407843], //Longitude, latitude
            [-118.808878330345, 34.0016642996246]  //Longitude, latitude
        ]
     };
     const simpleLineSymbol = {
        type: "simple-line",
        color: [226, 119, 40], // Orange
        width: 2
     };
    
     const polylineGraphic = new Graphic({
        geometry: polyline,
        symbol: simpleLineSymbol
     });
     graphicsLayer.add(polylineGraphic);
    
     // Create a polygon geometry
     const polygon = {
        type: "polygon",
        rings: [
            [-118.818984489994, 34.0137559967283], //Longitude, latitude
            [-118.806796597377, 34.0215816298725], //Longitude, latitude
            [-118.791432890735, 34.0163883241613], //Longitude, latitude
            [-118.79596686535, 34.008564864635],   //Longitude, latitude
            [-118.808558110679, 34.0035027131376]  //Longitude, latitude
        ]
     };
    
     const simpleFillSymbol = {
        type: "simple-fill",
        color: [227, 139, 79, 0.8],  // Orange, opacity 80%
        outline: {
            color: [255, 255, 255],
            width: 1
        }
     };
    
     const popupTemplate = {
        title: "{Name}",
        content: "{Description}"
     }
     const attributes = {
        Name: "Graphic",
        Description: "I am a polygon"
     }
    
     const polygonGraphic = new Graphic({
        geometry: polygon,
        symbol: simpleFillSymbol,
    
        attributes: attributes,
        popupTemplate: popupTemplate
    
     });
     graphicsLayer.add(polygonGraphic);


     
      
      const mapView: esri.MapView = new EsriMapView(mapViewProperties);

      mapView.graphics.add(polylineGraphic);

      // All resources in the MapView and the map have loaded.
      // Now execute additional processes
      mapView.when(() => {
        this.mapLoaded.emit(true);
      });
    } catch (error) {
      alert('We have an error: ' + error);
    }

  }

  ngOnInit() {
    //this.initializeMap();
    // console.log(this.zoom)
    // console.log(this._center)
    // console.log(this._basemap)
    // console.log(this._ground)
  }

}