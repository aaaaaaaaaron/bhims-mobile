import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { IonicModule } from '@ionic/angular';
// import markerIcon from "../../../node_modules/leaflet/dist/images/marker-icon.png";

import { Icon, Map as LMap, TileLayer, circle, icon, marker } from 'leaflet';
// import managementUnits from '../../assets/geojson/management_units.json';
// import managementUnits from './management_units.json';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    IonicModule,
    LeafletModule],
})
export class MapComponent  implements OnInit {

  public map: LMap | undefined;
  public center: [number, number] = [
    63.59364601635083, -149.37734333220024
  ];

  public options = {
    zoom: 8,
    maxZoom: 18,
    zoomControl: false,
    // preferCanvas: true,
    attributionControl: true,
    center: this.center,
    layers: [
      new TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
    ],
  };

  // todo implement this with geojson. For some reason reading json in typescript is hard.
  // layer = circle(this.center, { radius: 5000 });

  layers = [
    marker(this.center, {
      icon: icon({
        ...Icon.Default.prototype.options,
        iconUrl: 'assets/marker-icon.png',
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    })
    // marker(this.center, {icon: Icon.Default})

  ]

  public managementUnits: any;

  public async onMapReady(lMap: LMap) {
    this.map = lMap;
    // console.log(JSON.parse(""))
    setTimeout(() => lMap.invalidateSize(true), 0);
  }

  constructor() {
    // this.managementUnits = GeoJSON()
  }


  ngOnInit() {}

}
