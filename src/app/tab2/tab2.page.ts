import { Component, ViewChild } from '@angular/core';
import { IonModal, IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ReportService } from '../services/report.service';
import { NgFor, NgStyle } from '@angular/common';
import { Clipboard } from '@capacitor/clipboard';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss', '../tab3/tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, NgFor, NgStyle]
})
export class Tab2Page {
  // @ViewChild(IonModal) modal!: IonModal;

  constructor(public reportService: ReportService) {}
  
  // cancel() {
  //   this.modal.dismiss(null, 'cancel');
  // }

  public writeToClipboard = async (toWrite: string) => {
    await Clipboard.write({
      string: toWrite
    });
  };

}
