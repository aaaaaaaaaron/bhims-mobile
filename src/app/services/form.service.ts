import { Injectable, ViewChildren } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { FormDataService } from './form-data.service';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class FormService {

  public accordions: Accordion[];
  public fieldContainers: FieldContainer[];
  public fields: Field[];
  public pages: Page[];
  public sections: Section[];

  public country_codes: Option[];
  public human_group_type_codes: Option[];
  public general_human_activity_codes: Option[];
  public place_name_codes: Option[];
  public backcountry_unit_codes: Option[];
  public road_name_codes: Option[];
  public datum_codes: Option[];
  public location_accuracy_codes: Option[];
  public bear_species_codes: Option[];
  public bear_color_codes: Option[];
  public bear_cohort_codes: Option[];
  public boolean_response_codes: Option[];
  public bear_injury_codes: Option[];
  public habitat_type_codes: Option[];
  public sex_codes: Option[];
  public visibility_codes: Option[];
  public initial_human_action_codes: Option[];
  public initial_bear_action_codes: Option[];
  public reaction_by_codes: Option[];
  public reported_probable_cause_codes: Option[];
  public reaction_codes: Option[];
  public food_present_codes: Option[];
  public structure_interaction_codes: Option[];
  public structure_type_codes: Option[];
  public file_type_codes: Option[];
  public management_classification_codes: Option[];
  public probable_cause_codes: Option[];
  public improper_reaction_codes: Option[];
  public management_action_codes: Option[];

  public masterPage: Page

  // public fieldEntries: Map<String, String>


  public selectOptions: Map<String, Option[]>


  constructor(private formData: FormDataService) {
    //todo probably move a lot of this logic to form-data service
    this.accordions = Object.values(JSON.parse(formData.accordions))
    this.fieldContainers =  Object.values(JSON.parse(formData.fieldContainers))
    this.fields =  Object.values(JSON.parse(formData.fields)) //"other" issue colum 3447 problem is with \ escape char. Also 51887 has a "Other w/o ending quote. Jeez.
    this.pages =  Object.values(JSON.parse(formData.pages))
    this.sections = Object.values(JSON.parse(formData.sections))

    this.country_codes = JSON.parse(formData.country_codes)
    this.human_group_type_codes = JSON.parse(formData.human_group_type_codes)
    this.general_human_activity_codes = JSON.parse(formData.general_human_activity_codes)
    this.place_name_codes = JSON.parse(formData.place_name_codes)
    this.backcountry_unit_codes = JSON.parse(formData.backcountry_unit_codes)
    this.road_name_codes = JSON.parse(formData.road_name_codes)
    this.datum_codes = JSON.parse(formData.datum_codes)
    this.location_accuracy_codes = JSON.parse(formData.location_accuracy_codes)
    this.bear_species_codes = JSON.parse(formData.bear_species_codes)
    this.bear_color_codes = JSON.parse(formData.bear_color_codes)
    this.bear_cohort_codes = JSON.parse(formData.bear_cohort_codes)
    this.boolean_response_codes = JSON.parse(formData.boolean_response_codes)
    this.bear_injury_codes = JSON.parse(formData.bear_injury_codes)
    this.habitat_type_codes = JSON.parse(formData.habitat_type_codes)
    this.sex_codes = JSON.parse(formData.sex_codes)
    this.visibility_codes = JSON.parse(formData.visibility_codes)
    this.initial_human_action_codes = JSON.parse(formData.initial_human_action_codes)
    this.initial_bear_action_codes = JSON.parse(formData.initial_bear_action_codes)
    this.reaction_by_codes = JSON.parse(formData.reaction_by_codes)
    this.reported_probable_cause_codes = JSON.parse(formData.reported_probable_cause_codes)
    this.reaction_codes = JSON.parse(formData.reaction_codes)
    this.food_present_codes = JSON.parse(formData.food_present_codes)
    this.structure_interaction_codes = JSON.parse(formData.structure_interaction_codes)
    this.structure_type_codes = JSON.parse(formData.structure_type_codes)
    this.file_type_codes = JSON.parse(formData.file_type_codes)
    this.management_classification_codes = JSON.parse(formData.management_classification_codes)
    this.probable_cause_codes = JSON.parse(formData.probable_cause_codes)
    this.improper_reaction_codes = JSON.parse(formData.improper_reaction_codes)
    // this.file_type_codes = JSON.parse(formData.file_type_codes)
    this.management_action_codes = JSON.parse(formData.management_action_codes)


    this.selectOptions = new Map([
      ["country_codes", JSON.parse(formData.country_codes)],
      ["human_group_type_codes", JSON.parse(formData.human_group_type_codes)],
      ["general_human_activity_codes", JSON.parse(formData.general_human_activity_codes)],
      ["place_name_codes", JSON.parse(formData.place_name_codes)],
      ["backcountry_unit_codes", JSON.parse(formData.backcountry_unit_codes)],
      ["road_name_codes", JSON.parse(formData.road_name_codes)],
      ["datum_codes", JSON.parse(formData.datum_codes)],
      ["location_accuracy_codes", JSON.parse(formData.location_accuracy_codes)],
      ["bear_species_codes", JSON.parse(formData.bear_species_codes)],
      ["bear_color_codes", JSON.parse(formData.bear_color_codes)],
      ["bear_cohort_codes", JSON.parse(formData.bear_cohort_codes)],
      ["boolean_response_codes", JSON.parse(formData.boolean_response_codes)],
      ["bear_injury_codes", JSON.parse(formData.bear_injury_codes)],
      ["habitat_type_codes", JSON.parse(formData.habitat_type_codes)],
      ["sex_codes", JSON.parse(formData.sex_codes)],
      ["visibility_codes", JSON.parse(formData.visibility_codes)],
      ["initial_human_action_codes", JSON.parse(formData.initial_human_action_codes)],
      ["initial_bear_action_codes", JSON.parse(formData.initial_bear_action_codes)],
      ["reaction_by_codes", JSON.parse(formData.reaction_by_codes)],
      ["reported_probable_cause_codes", JSON.parse(formData.reported_probable_cause_codes)],
      ["reaction_codes", JSON.parse(formData.reaction_codes)],
      ["food_present_codes", JSON.parse(formData.food_present_codes)],
      ["structure_interaction_codes", JSON.parse(formData.structure_interaction_codes)],
      ["file_type_codes", JSON.parse(formData.file_type_codes)],
      ["management_classification_codes", JSON.parse(formData.management_classification_codes)],
      ["probable_cause_codes", JSON.parse(formData.probable_cause_codes)],
      ["improper_reaction_codes", JSON.parse(formData.improper_reaction_codes)],
      ["management_action_codes", JSON.parse(formData.management_action_codes)]
    ])


    this.masterPage = this.initializeMasterPage()

  }

  private initializeMasterPage(): Page {
    console.log("initializing master page")

    // no filtering required for a pages sections
    let sections = _.cloneDeep(this.sections)

    for (let section of sections) {
      // section's field containers
      let sections_field_containers = this.fieldContainers.filter(fieldContainer => fieldContainer.section_id == section.id)
      section.field_containers = _.cloneDeep(sections_field_containers)
      for (let fieldContainer of section.field_containers) {
        let field_containers_fields = this.fields.filter(field => field.field_container_id == fieldContainer.id)
        fieldContainer.fields = _.cloneDeep(field_containers_fields)
      }

      // section's accordions
      let sections_accordions = this.accordions.filter(accordion => accordion.section_id == section.id)
      section.accordions = _.cloneDeep(sections_accordions)
      for (let accordion of section.accordions) {
        let accordions_field_containers = this.fieldContainers.filter(fieldContainer => fieldContainer.accordion_id == accordion.id)
        accordion.fans = [_.cloneDeep(accordions_field_containers)]
        for (let fieldContainer of accordion.fans[0]) { // only need to access the first one
          let field_containers_fields = this.fields.filter(field => field.field_container_id == fieldContainer.id)
          fieldContainer.fields = _.cloneDeep(field_containers_fields)
        }
      }
    }

    let masterPage: Page = {
      id: '0',
      page_name: 'master page',
      page_index: '0',
      css_class: '',
      sections: sections
    }

    return masterPage
  }

  // TODO: figure out if this one can be a function. It would probably be the easist choice 
  // but I really don't think functions should be in an *ngFor
  public getSelectOptions(name: string, lookup_table: string) {
    return lookup_table == null ? this.selectOptions.get(name + 's') : this.selectOptions.get(lookup_table)
  }

  public saveForm() {
    console.log("Saving form...")
    console.log(this.masterPage)
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
}

// select options
export interface Option {
  value: string
  name: string
}
