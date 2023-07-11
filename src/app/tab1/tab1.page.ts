import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss', '../tab3/tab3.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class Tab1Page {
  constructor() {}
}
