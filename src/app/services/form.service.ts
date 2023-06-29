import { Injectable, ViewChildren } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { FormDataService } from './form-data.service';
import * as _ from 'lodash';
// import { deepClone } from '@angular-devkit/core';




@Injectable({
  providedIn: 'root'
})
export class FormService {

  // @ViewChildren('myInput') vc: any;


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


  // public fieldEntries: Map<String, String>
  // public formattedFields: (Field|Field[])[]


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

    // this.fieldEntries = this.createFieldEntries()
    // this.formattedFields = this.createFormattedFields()



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
      ["management_action_codes", JSON.parse(formData.management_action_codes)],

    ])

  }


  // TODO: Im gonna be honest I think that putting a function in the ngFor is a bad idea. But who knows!
  // maybe a pipe is the right idea after all. I feel like I remember this from a while ago.
  // todo - add accordion filtering fc is the only one with this weird relationship.
  // public filterFieldContainers(fieldContainers: FieldContainer[], parentId: number) {
  //   return fieldContainers.filter(item => item.sectionId==parentId)
  // }


  // TODO: figure out if this one can be a function. It would probably be the easist choice 
  // but I really don't think functions should be in an *ngFor
  public getSelectOptions(name: string, lookup_table: string) {
    return lookup_table == null ? this.selectOptions.get(name + 's') : this.selectOptions.get(lookup_table)
  }


  //TODO: I am trying to use ngModel. What I want to do is map the field name to a item in a js object. It should be initialized
  // empty. This function creates that map from the fields object.

  // OKay that method isn't going to work because it binds to a variable, not an object. So I can bind it to one of the
  // vars in fields[] but it is not at all conducive to accordions. Options from here: try to make it conducive with accordions:
  // idk how but maybe think about it. Second option: Try redoing createFieldEntries but create an interface?! Is this even possible?

  public createFieldEntries() {
    let fieldEntries = new Map<String, String>()
    
    for (let field of this.fields) {
      // console.log(field)
      fieldEntries.set(field.field_name, '')
    }

    console.log(fieldEntries)
    return fieldEntries;
  }


  // Okay new idea: create a new version of fields[] that incorporates the accordion logic. I will have to rework a lot of the
  // accordion stuff but the motivation is so we can have variables for each accordion entry.

  // nahh will this even work?!?! Becuase then what am I even looping over in the html? Does angular allow looping over
  // different data types? Probably not. Maybe I could make everything a list but only expand the list for accordions.
  // AHHHH this is so annoying.
  // public createFormattedFields() {

  //   //logic: get field container ids from accordion
  //   // if field container in  
  //   let formattedFields: (Field|Field[])[] = []

  //   for (let field of this.fields) {
  //     formattedFields.push(field)
  //   }

  //   console.log("a")
  //   console.log(formattedFields)
  //   console.log("b")
  //   console.log(this.fieldContainers)
  //   console.log("c")
  //   console.log(this.accordions)
  //   return formattedFields
  // }


  // Okay new plan. Use reactive forms. But first I want to try something - 

  public saveForm() {
    let result = []

    // let vc;
    // console.log(this.vc)

    console.log(this.fields)

    // console.log("Saving form...")
  }



  // Rewriting the pipes as functions

  public fieldFilter(items: Field[], fieldContainerId: string): Field[] {
    // items = items.slice().filter(item => item.field_container_id == fieldContainerId)

    // return deepClone(items);

    // return _.cloneDeep(items)
    
    // return JSON.parse(JSON.stringify(items)) // deep copy is taking too long. This sucks!
    // console.log('eeee')
    return items.filter(item => item.field_container_id == fieldContainerId)
  }

  public fieldContainerFilter(items: FieldContainer[], type: string, id: string): any {
    if (type == "Accordion"){
      return items.slice().filter(item => item.accordion_id == id)
    }
    else if (type == "Section"){
      return items.slice().filter(item => item.section_id == id)
    }
    else {
      throw new Error("type must be 'Accordion' or 'Section'")
    }
  }


  public addFieldContainer(newFields: Field[], fieldContainerId: string, accordionId: string) {
    // Waa finally here we have some joined logic for all of the fields. This is where we can do the creation of the output.
    // And the validation
    console.log(fieldContainerId)
    console.log(newFields)
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

export interface Option {
  value: string
  name: string
}


// TODO: pipes are not they way here to filter. What we really need to do is declare our own lists in this class with what we need
// and when we need it.
// jk I think I like pipes now

@Pipe({
  name: 'fieldcontainerfilter',
  pure: false,
  standalone: true
})
export class FieldContainerFilterPipe implements PipeTransform {
  transform(items: FieldContainer[], type: string, id: string): any {
    if (type == "Accordion"){
      return items.slice().filter(item => item.accordion_id == id)
    }
    else if (type == "Section"){
      return items.slice().filter(item => item.section_id == id)
    }
    else {
      throw new Error("type must be 'Accordion' or 'Section'")
    }
  }
}

@Pipe({
  name: 'accordionfilter',
  pure: false,
  standalone: true
})
export class AccordionFilterPipe implements PipeTransform {
  transform(items: Accordion[], sectionId: string): any {
    return items.slice().filter(item => item.section_id == sectionId)
  }
}

@Pipe({
  name: 'fieldfilter',
  pure: false,
  standalone: true
})
export class FieldFilterPipe implements PipeTransform {
  transform(items: Field[], fieldContainerId: string): any {
    return items.slice().filter(item => item.field_container_id == fieldContainerId)
  }
}
