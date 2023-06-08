import { Component, Input, OnInit } from '@angular/core';
import { FieldContainerAccordionFilterPipe, FieldContainerFilterPipe, FieldContainerSectionFilterPipe, FieldFilterPipe, FormService } from 'src/app/services/form.service';
import { IonicModule } from '@ionic/angular';
import { KeyValuePipe, NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-field-container',
  templateUrl: './field-container.component.html',
  styleUrls: ['./field-container.component.scss'],
  standalone: true,
  imports: [IonicModule, FieldContainerComponent, KeyValuePipe, NgFor, NgIf,
     FieldContainerAccordionFilterPipe, FieldContainerSectionFilterPipe, FieldFilterPipe, FieldContainerFilterPipe]
})
export class FieldContainerComponent  implements OnInit {
  @Input() sectionId!: string;
  @Input() type!: string;


  constructor(public formService: FormService) { }

  ngOnInit() {}

}
