import { Component, Input, OnInit } from '@angular/core';
import {FieldContainerFilterPipe, FieldFilterPipe, FormService } from 'src/app/services/form.service';
import { IonicModule } from '@ionic/angular';
import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-field-container',
  templateUrl: './field-container.component.html',
  styleUrls: ['./field-container.component.scss'],
  standalone: true,
  imports: [IonicModule, FieldContainerComponent, KeyValuePipe, NgFor, NgIf,
     FieldFilterPipe, FieldContainerFilterPipe, FormsModule]
})
export class FieldContainerComponent  implements OnInit {
  @Input() sectionId!: string;
  @Input() type!: string;
  @Input() accordionIndex!: string;


  constructor(public formService: FormService) { 
  }

  ngOnInit() {}

  public getModel(fieldName: string) {
    return this.formService.fieldEntries.get(fieldName)
  }

  // two ways to think of getting data. One is this function which fills out and saves a js data type everytime 
  // a field is changed. This is easiest approach. The biggest problem with this is that when we load in the data from
  // the reports tab we don't really have binding. Other approach is using two way binding but idk how to do that.

  public fieldChange(event: any, fieldName: string){
    // console.log(fieldName)
    // console.log(this.accordionIndex)
    // console.log(event.target)
    // console.log(event.target.value)

    // console.log(this.formService.fieldEntries)
    // console.log(this.selectedTeam)

    console.log(this.formService.fields)
  }

}
