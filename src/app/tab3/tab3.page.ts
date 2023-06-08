import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormService, FieldContainerFilterPipe, FieldFilterPipe, ObjectToListPipe } from '../services/form.service';
import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
// import {data} from "src/assets/form/pages.txt"
// import {data} from "../../assets/form/pages.txt"


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, NgFor, NgIf, FieldContainerFilterPipe, FieldFilterPipe, KeyValuePipe, ObjectToListPipe],
})
export class Tab3Page implements OnInit {

  ngOnInit() {
    console.log("waaaa luigi");
  }

  
  constructor(public formService: FormService) {}

}
