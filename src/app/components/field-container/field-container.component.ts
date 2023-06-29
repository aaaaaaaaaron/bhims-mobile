import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {Field, FieldContainerFilterPipe, FieldFilterPipe, FormService } from 'src/app/services/form.service';
import { IonicModule } from '@ionic/angular';
import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { EventEmitter } from 'stream';


@Component({
  selector: 'app-field-container',
  templateUrl: './field-container.component.html',
  styleUrls: ['./field-container.component.scss'],
  standalone: true,
  imports: [IonicModule, FieldContainerComponent, KeyValuePipe, NgFor, NgIf,
     FieldFilterPipe, FieldContainerFilterPipe, FormsModule, ReactiveFormsModule]
})
export class FieldContainerComponent  implements OnInit {
  @Input() sectionId!: string;
  @Input() type!: string;
  @Input() accordionIndex!: string;
  @Input() fieldContainerId!: string;

  // I want to try passing in a structure of a list of fields
  // @Input() fields!: Field[];
  public fields: Field[];

  @Output() fieldEmitter = new EventEmitter<Field[]>();



  constructor(public formService: FormService) { 
    this.fields = []
    // this.fields = this.fieldFilter(formService.fields, this.fieldContainerId)
    // console.log(this.fields)
  }

  // public emitOutput

    // Rewriting the pipes as functions
  public fieldFilter(items: Field[], fieldContainerId: string): Field[] {
    return items.filter(item => item.field_container_id == fieldContainerId)
  }

  ngOnInit() {
    // console.log(this.sectionId)
    // console.log(this.fields)
    // this.fields = this.fields.slice()
    // console.log(JSON.stringify(this.fields))

    // this.fields = JSON.parse(JSON.stringify(this.fields)) // DEEP CLONE!!! why no work
    // this.fields = []

    // this.fields = []
    // if (this.fields[0]) {this.fields[0].value="hotdog!"}

    this.fields = this.fieldFilter(this.formService.fields, this.fieldContainerId)
    console.log(this.fields)
  }

  // public getModel(fieldName: string) {
  //   return this.formService.fieldEntries.get(fieldName)
  // }

  // two ways to think of getting data. One is this function which fills out and saves a js data type everytime 
  // a field is changed. This is easiest approach. The biggest problem with this is that when we load in the data from
  // the reports tab we don't really have binding. Other approach is using two way binding but idk how to do that.

  public fieldChange(event: any, fieldName: string){
    // console.log("Heyyy")
    // this.fields = []

    // console.log(fieldName)
    // console.log(this.accordionIndex)
    // console.log(event.target)
    // console.log(event.target.value)

    // console.log(this.formService.fieldEntries)
    // console.log(this.selectedTeam)
    console.log(this.fields)

    this.fieldEmitter.emit(this.fields)
    console.log(this.fields)
    console.log(this.formService.fields)

    // console.log(this.fields)
  }

  // Biggest thing I am thinking about right now is if we can load this data back in.
  // How could we?!?!?!
  // For non-accordions it should be easy enough. Just pass through the fields to the field containers and it should bind
  // For accordions we could pass through in a similar way
  // Wait I think this might actually work lol

}
