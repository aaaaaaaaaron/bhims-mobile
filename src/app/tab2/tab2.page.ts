import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, IonicModule } from '@ionic/angular';
import { ReportService } from '../services/report.service';
import { NgFor, NgStyle } from '@angular/common';
import { Clipboard } from '@capacitor/clipboard';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss', '../tab3/tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, NgFor, NgStyle]
})
export class Tab2Page implements OnInit {

  constructor(public reportService: ReportService) { }
  
  // This works as long as the page is not initially opened on tab 2
  // todo figure out how promise/observables work and use that instead but for now this is good because it should never open on tab 2
  // Or figure out how angular Route Resolvers work.
  async ngOnInit() { 
    console.log("ngOnInit")
    this.reportService.loadReports()
   }

  public writeToClipboard = async (toWrite: any) => {
    await Clipboard.write({
      string: JSON.stringify(toWrite)
    });
  };

}
