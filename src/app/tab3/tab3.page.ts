import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormService } from '../services/form.service';
import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { FieldContainerComponent } from '../components/field-container/field-container.component';
import { AccordionContainerComponent } from '../components/accordion-container/accordion-container.component';
import { ReportService } from '../services/report.service';
import { FormDataService } from '../services/form-data.service';
// import {data} from "src/assets/form/pages.txt"
// import {data} from "../../assets/form/pages.txt"


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, NgFor, NgIf,
     KeyValuePipe, FieldContainerComponent, AccordionContainerComponent],
})
export class Tab3Page implements OnInit {

  icon = "/assets/images/bhims_icon_50px.svg"
  
  constructor(public formService: FormService, public reportService: ReportService, public formDataService: FormDataService) {
    console.log(formDataService.fields)
  }

  ngOnInit() {
    console.log("waaaa luigi");
  }

}
