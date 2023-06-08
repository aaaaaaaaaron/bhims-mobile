import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { FormDataService } from './form-data.service';


@Injectable({
  providedIn: 'root'
})
export class FormService {


  public accordions: Accordion[];
  public fieldContainers: FieldContainer[];
  public fields: Field[];
  public pages: Page[];
  public sections: Section[];

  constructor(private formData: FormDataService) {
    //todo probably move a lot of this logic to form-data service
    this.accordions = Object.values(JSON.parse(formData.accordions))
    this.fieldContainers =  Object.values(JSON.parse(formData.fieldContainers))
    this.fields =  Object.values(JSON.parse(formData.fields)) //"other" issue colum 3447 problem is with \ escape char. Also 51887 has a "Other w/o ending quote. Jeez.
    this.pages =  Object.values(JSON.parse(formData.pages))
    this.sections = Object.values(JSON.parse(formData.sections))

    console.log(typeof(this.sections))
  }


  // TODO: Im gonna be honest I think that putting a function in the ngFor is a bad idea. But who knows!
  // maybe a pipe is the right idea after all. I feel like I remember this from a while ago.
  // todo - add accordion filtering fc is the only one with this weird relationship.
  // public filterFieldContainers(fieldContainers: FieldContainer[], parentId: number) {
  //   return fieldContainers.filter(item => item.sectionId==parentId)
  // }


  // TODO: figure out if this one can be a function. It would probably be the easist choice 
  // but I really don't think functions should be in an *ngFor
  public getSelectOptions(fieldName: string) {

    console.log(this.formData.accordions)
    let accordions: Accordion[] = JSON.parse(this.formData.accordions)
    console.log(accordions)
    console.log(accordions[1])
    console.log(accordions[4].id)


    // switch(fieldName) {
    //   case "Bear Color":
    //     return this.bearSpeciesTest
    //     break
    //   case "Bear Group Type":
    //     return this.bearGroupTypesTest
    //     break
    // }

    return
  }

}



// interfaces above were just for when I was doing my testing to see if it was viable.

export interface Accordion {
  add_button_label: string,
  card_link_label_css_class: string,
  card_link_label_order_column: string
  card_link_label_separator: string
  card_link_label_text: string
  css_class: string
  dependent_target: string
  dependent_value: string
  display_name: string
  display_order: string
  html_id: string
  id: string
  is_enabled: string
  item_name: string
  name: string
  section_id: string
  table_name: string
}

export interface FieldContainer {
  id: string
  display_order: string
  css_class: string
  section_id: string
  accordion_id: string
  is_enabled: string
  description: string
}

export interface Field {
  id: string
  table_name: string
  field_name: string
  html_input_type: string
  css_class: string
  display_name: string
  display_order: string
  html_id: string
  placehold: string
  label_text: string
  required: string
  dependent_target: string
  dependent_value: string
  default_value: string
  lookup_table: string
  parent_css_class: string
  field_container_id: string
  on_change: string
  card_label_index: string
  calculation_targer: string
  html_min: string
  html_max: string  
  html_step: string
  is_enabled: string
  description: string
  is_enabled_for_entry: string
  has_pii: string
}

export interface Page {
  id: String
  page_name: String 
  page_index: String
  css_class: String
}

export interface Section {
  id: string
  section_title: string
  page_id: string
  display_order: string
  css_class: string
  title_css_class: string
  title_html_tag: string
  is_enabled: string
}



// TODO: pipes are not they way here to filter. What we really need to do is declare our own lists in this class with what we need
// and when we need it.
@Pipe({
  name: 'fieldcontainerfilter',
  pure: false,
  standalone: true
})
export class FieldContainerFilterPipe implements PipeTransform {
  transform(items: FieldContainer[], sectionId: string): any {
    return items.filter(item => item.section_id == sectionId)
    // return items
    // todo - add accordion filtering fc is the only one with this weird relationship.
  }
}

@Pipe({
  name: 'fieldfilter',
  pure: false,
  standalone: true
})
export class FieldFilterPipe implements PipeTransform {
  transform(items: Field[], fieldContainerId: string): any {
    return items.filter(item => item.field_container_id == fieldContainerId)
    // return items
    // todo - add accordion filtering fc is the only one with this weird relationship.
  }
}

@Pipe({
  name: 'objecttolist',
  pure: false,
  standalone: true
})
export class ObjectToListPipe implements PipeTransform {
  transform(items: Object[]): any {
    console.log("pipe start")
    // console.log(items)
    // console.log(Object.values(items))
    return Object.values(items)

    // items.map((item => {
    //   console.log(item)
    // }))
  }
}