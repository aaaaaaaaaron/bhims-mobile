import { Component, Input, OnInit } from '@angular/core';
import {Field, FieldContainer, FormService, Section } from 'src/app/services/form.service';
import { IonicModule } from '@ionic/angular';
import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormDataService } from 'src/app/services/form-data.service';
import { ReportService } from 'src/app/services/report.service';


@Component({
  selector: 'app-field-container',
  templateUrl: './field-container.component.html',
  styleUrls: ['./field-container.component.scss'],
  standalone: true,
  imports: [IonicModule, FieldContainerComponent, KeyValuePipe, NgFor, NgIf,
     FormsModule]
})
export class FieldContainerComponent  implements OnInit {
  @Input() fieldContainer!: FieldContainer
  @Input() section!: Section

  constructor(public formService: FormService, public formDataService: FormDataService, public reportService: ReportService) { }
  

  ngOnInit() { }

  public fieldChange(event: any, fieldName: string) { }

}
