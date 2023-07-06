import { Component, Input, OnInit } from '@angular/core';
import {Field, FieldContainer, FormService } from 'src/app/services/form.service';
import { IonicModule } from '@ionic/angular';
import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormDataService } from 'src/app/services/form-data.service';


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

  constructor(public formService: FormService, public formDataService: FormDataService) { }
  

  ngOnInit() { }

  public fieldChange(event: any, fieldName: string) { }

  // do not display if field depends on dropdown val == other
  // clear val of "other" if user changes it away from "other"
  public displayField(field: Field) {
    if (field.dependent_target != null) {
      let dependent_field_name = field.dependent_target.substring(7) + "_code" // have to do some shifting to get field name
      let dependent_field = this.fieldContainer.fields.find((field) => field.field_name == dependent_field_name)
      if (dependent_field?.value == field.dependent_value) {
        return true;
      }
      else {
        field.value = ''
        return false
      }
    }
    return true;
  }

}
