import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ReportService } from '../services/report.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss', '../tab3/tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, NgFor]
})
export class Tab2Page {

  constructor(public reportService: ReportService) {}

}
