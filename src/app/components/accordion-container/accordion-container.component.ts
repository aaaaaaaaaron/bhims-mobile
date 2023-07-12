import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FieldContainerComponent } from '../field-container/field-container.component';
import { IonicModule } from '@ionic/angular';
import { NgFor, NgIf } from '@angular/common';
import { Accordion, FieldContainer, Section } from 'src/app/services/form.service';
const _ = require('lodash')


@Pipe({
  name: 'readableIndex',
  pure: false,
  standalone: true
})
export class ReadableIndexPipe implements PipeTransform {
  transform(value: number): any {
    let indices = [null, "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eigth", "Nineth", "Tenth"]
    return indices[value]
  }
}


@Component({
  selector: 'app-accordion-container',
  templateUrl: './accordion-container.component.html',
  styleUrls: ['./accordion-container.component.scss'],
  standalone: true,
  imports: [IonicModule, FieldContainerComponent, NgFor, NgIf, ReadableIndexPipe]
})
export class AccordionContainerComponent {
  @ Input() accordion!: Accordion
  @ Input() section!: Section
  @ Input() display!: boolean

  constructor() { }

  public addItem() {
    // todo add modal if can't add item
    if (this.accordion.fans.length < 10 && this.accordion.allRequiredFilled()) {
      let toAdd: FieldContainer[] = _.cloneDeep(this.accordion.fans[0])
      for (let fieldContainer of toAdd) {
        for (let field of fieldContainer.fields) {
          field.value = ''
        }
      }
      this.accordion.fans.push(toAdd)
    }  
  }

  public deleteItem(index: number) {
    if (this.accordion.fans.length > 1) {
      this.accordion.fans.splice(index, 1)
    }
  }




}

