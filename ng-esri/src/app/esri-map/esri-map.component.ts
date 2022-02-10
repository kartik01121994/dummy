import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { loadModules } from 'esri-loader';
import * as Polyline from 'esri/geometry/Polyline';
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
      const [EsriMap, EsriMapView, Graphic] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        "esri/Graphic"
        
      ]);

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

      const polyline = {
        type: "polyline", // autocasts as new Polyline()
        paths: [[22.75, 75.89], [22.754507689138205, 75.89437123254802]]
      };

      const lineSymbol = {
        type: "simple-line", // autocasts as new SimpleLineSymbol()
        color: [226, 119, 40], // RGB color values as an array
        width: 4
      };


      const lineAtt = {
        Name: "Keystone Pipeline", // The name of the pipeline
        Owner: "TransCanada", // The owner of the pipeline
        Length: "3,456 km" // The length of the pipeline
      };
      
      const polylineGraphic = new Graphic({
        geometry: polyline, // Add the geometry created in step 4
        symbol: lineSymbol, // Add the symbol created in step 5
        attributes: lineAtt, // Add the attributes created in step 6
        popupTemplate: {
          title: "{Name}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "Name"
                },
                {
                  fieldName: "Owner"
                },
                {
                  fieldName: "Length"
                }
              ]
            }
          ]
        }
      });

     
      
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
    this.initializeMap();
    console.log(this.zoom)
    console.log(this._center)
    console.log(this._basemap)
    console.log(this._ground)
  }

}