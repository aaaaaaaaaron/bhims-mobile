import { Component, Input, OnInit } from '@angular/core';
import {FieldContainer, FormService } from 'src/app/services/form.service';
import { IonicModule } from '@ionic/angular';
import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


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

  constructor(public formService: FormService) { 
  }

  ngOnInit() {}

  public fieldChange(event: any, fieldName: string) {

  }

}
