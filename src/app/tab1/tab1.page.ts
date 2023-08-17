import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReportService } from '../services/report.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from '../components/map/map.component';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    IonicModule, MapComponent],
})
export class Tab1Page {


  constructor() {  }

}
