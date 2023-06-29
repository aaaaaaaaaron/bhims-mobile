import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FieldContainerComponent } from '../field-container/field-container.component';
import { IonicModule } from '@ionic/angular';
import { NgFor } from '@angular/common';
import { Accordion, FieldContainer, FormService } from 'src/app/services/form.service';

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
  @Input() accordionId!: string; //todo I think we can deprecate these 3
  @Input() accordionAddButton!: string;
  @Input() accordionItem!: string;

  @Input() accordion!: Accordion;

  // An accordion can have multiple field containers. So Should we pass through the list of field containers? Yes!
  // But what kind of field container? Can't really pass through the component so I guess I'll do ts object
  @Input() fieldContainers!: FieldContainer[]

  // public fans: FieldContainer[][]

  // should accordions be just a count of the # of accordions? THen we can just use an id to get each one? Or should it be
  // something like it stores each of the field containers. I am going to go with the first method for now
  public accordionCount: number // todo deprecate this

  constructor(public formService: FormService) {
    // this.fans = []
    this.accordionCount = 1
   }

  ngOnInit() {
    // this.fans.push(this.fieldContainers.slice())
    // console.log(this.fans)
  }

  public incrementCount() {
    // this.fans.push(this.fieldContainers.slice())
    // console.log(this.fans)
    if (this.accordionCount < 10) {
      this.accordionCount++
    }  
  }

  public decrementCount() {
    if (this.accordionCount >= 1) {
      this.accordionCount--
    }
  }




}

