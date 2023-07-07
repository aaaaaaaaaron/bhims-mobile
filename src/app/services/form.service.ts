import { Injectable, ViewChildren } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { FormDataService } from './form-data.service';
// import * as _ from 'lodash';
import { ReportService } from './report.service';


@Injectable({
  providedIn: 'root'
})
export class FormService {

  
  // Keeping report service in here to do some validation later
  constructor(public reportService: ReportService) {  }

  public displayAccordion(accordion: Accordion, section: Section): boolean {
    if (accordion.dependent_target != null) {
      let dependent_field_name = accordion.dependent_target.substring(7)
      let dependent_field = section.field_containers.flatMap((fieldContainer) => fieldContainer.fields).find((field) => field.field_name == dependent_field_name)
      if (dependent_field?.value == accordion.dependent_value) {
        return true;
      }
      else {
        // empty accordion (maybe reset values instead?)
        // Will need to empty accordion on export if there is only 1 empty guy
        accordion.fans[0].forEach((fieldContainer) => fieldContainer.fields.forEach((field) => field.value = ''))
        return false
      }
    }
    return true;
  }

}


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
  fans: FieldContainer[][] // list of list of field containers. "fan" is top level of group of field containers
  allRequiredFilled(): boolean
}

export interface FieldContainer {
  id: string
  display_order: string
  css_class: string
  section_id: string
  accordion_id: string
  is_enabled: string
  description: string
  fields: Field[]
  allRequiredFilled(): boolean
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
  placeholder: string
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
  value: string
}

export interface Page {
  id: String
  page_name: String 
  page_index: String
  css_class: String
  sections: Section[]
  allRequiredFilled(): boolean
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
  field_containers: FieldContainer[]
  accordions: Accordion[]
  allRequiredFilled(): boolean
}

// select options
export interface Option {
  value: string
  name: string
}
