import { Component, OnInit, AfterViewInit } from '@angular/core';


import 'proj4leaflet';
import * as Proj from 'proj4leaflet';
import * as L from 'leaflet';
import proj4 from 'proj4';
import { BdserviceService } from '../../services/bdservice.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styles: [
  ]
})
export class MapaComponent implements OnInit {

  poligonos!: Proj.Proj4GeoJSONFeature;

  constructor(private bdService: BdserviceService) {
  }

  ngOnInit(): void {

    var map = L.map('map').setView([0, 0], 2);

    L.tileLayer(
      'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
      {
        attribution: 'Data by <a href="https://openstreetmap.org">OpenStreetMap contributors</a>'
      }
    )
      .addTo(map);

    // GeoJSON layer (UTM15)
    proj4.defs('EPSG:32717', '+proj=utm +zone=17 +south +datum=WGS84 +units=m +no_defs');

    this.bdService.getPoligonos()
      .subscribe((resp) => {
        this.poligonos = resp;
        console.log(this.poligonos)

        var geoJsonLayer = L.Proj.geoJson(this.poligonos, {
          style: function (feature) {
            // Define el estilo del polígono aquí
            return {
              fillColor: 'blue', // Color de relleno
              weight: 2,          // Grosor del borde
              opacity: 1,         // Opacidad del borde
              color: 'white',     // Color del borde
              fillOpacity: 0.5    // Opacidad del relleno
            };
          },
          onEachFeature: function (feature, layer) {
            // Añade una función para cada característica (en este caso, el polígono)
            // Esta función se ejecutará para cada polígono creado
            // Puedes agregar enlaces emergentes, tooltips u otras interacciones aquí
            layer.bindPopup(feature.properties.NOMBRE); // Por ejemplo, un popup con el nombre de la característica
          }
        }).addTo(map);

        var bounds = geoJsonLayer.getBounds();

        map.fitBounds(bounds);

      })

    /*var geojson: Proj.Proj4GeoJSONFeature  = {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [481650, 4980105],
      },
      'properties': {
        'name': 'University of Minnesota'
      },
      'crs': {
        'type': 'name',
        'properties': {
          'name': 'urn:ogc:def:crs:EPSG::26915'
        }
      }
    };
  
    console.log(geojson)
  
    L.Proj.geoJson(geojson, {
      'pointToLayer': function (feature:any, latlng:any) {
        return L.marker(latlng).bindPopup(feature.properties.name);
      }
    }).addTo(map);*/
  }

}


