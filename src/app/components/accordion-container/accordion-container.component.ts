import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FieldContainerComponent } from '../field-container/field-container.component';
import { IonicModule } from '@ionic/angular';
import { NgFor } from '@angular/common';
import { Accordion } from 'src/app/services/form.service';

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
  imports: [IonicModule, FieldContainerComponent, NgFor, ReadableIndexPipe]
})
export class AccordionContainerComponent  implements OnInit {
  @Input() accordionId!: string;
  @Input() accordionAddButton!: string;
  @Input() accordionItem!: string;



  // should accordions be just a count of the # of accordions? THen we can just use an id to get each one? Or should it be
  // something like it stores each of the field containers. I am going to go with the first method for now
  public accordionCount: number

  constructor() {
    this.accordionCount = 1
   }

  ngOnInit() {}

  public incrementCount() {
    this.accordionCount++
  }
  public decrementCount() {
    this.accordionCount--
  }




}

