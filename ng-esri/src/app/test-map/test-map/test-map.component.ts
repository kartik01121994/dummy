import { Component, OnInit } from '@angular/core';

import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-test-map',
  templateUrl: './test-map.component.html',
  styleUrls: ['./test-map.component.css']
})
export class TestMapComponent implements OnInit {

  constructor() { }


  async ngOnInit(): Promise<void> {
    await this.initializeMap();

  }

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



      const map = new Map({
        basemap: "dark-gray-vector"
      });

      const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-97, 38], // lon, lat
        scale: 10000000
      });



      const searchWidget = new Search({
        view: view,

      });

      // Add the search widget to the top left corner of the view
      view.ui.add(searchWidget, {
        position: "top-right"
      });

      // Add the search widget to the top left corner of the view



    } catch (error) {
      alert('We have an error: ' + error);
    }

  }
}
