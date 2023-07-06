import { Injectable } from '@angular/core';
import { Accordion, Field, FieldContainer, FormService, Page, Section } from './form.service';
import { FormDataService } from './form-data.service';
const _ = require('lodash')
import { Directory, Filesystem } from '@capacitor/filesystem';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  public reports: Page[]
  public reportIndex: number

  // todo: move initializeMasterPage here to get rid of circular dependency
  constructor(public formDataService: FormDataService) {
    
    this.reports = [this.initializeMasterPage()]

    this.reportIndex = 0

  }

  public getFormNumber(page: Page) {
    let formNumber = page.sections
      .filter(section => section.id=='12')[0].field_containers
      .filter(fieldContainer => fieldContainer.id=='73')[0].fields
      .filter(field => field.id=='135')[0].value

    return (formNumber == '' || formNumber == null) ? 'None' : formNumber
  }

  public addItem() {
    this.reports.push(this.initializeMasterPage())
  }

  // todo: delete logic can change the selected form sneakily. Maybe build some logic to counter that.
  public deleteReport(index: number) {
    if (this.reports.length > 1) {
      this.reports.splice(index, 1)
      if (this.reportIndex > this.reports.length - 1) {
        this.reportIndex = this.reports.length - 1
      }
    }
  }

  public selectReport(index: number) {
    console.log("switching reports to report: " + (index + 1).toString())
    this.reportIndex = index
  }

  public initializeMasterPage(): Page {
    console.log("initializing master page")

    // no filtering required for a pages sections
    let sections: Section[] = _.cloneDeep(this.formDataService.sections)

    for (let section of sections) {
      // section's field containers
      let sections_field_containers = this.formDataService.fieldContainers.filter(fieldContainer => fieldContainer.section_id == section.id)
      section.field_containers = _.cloneDeep(sections_field_containers)
      for (let fieldContainer of section.field_containers) {
        let field_containers_fields = this.formDataService.fields.filter(field => field.field_container_id == fieldContainer.id)
        fieldContainer.fields = _.cloneDeep(field_containers_fields)
        fieldContainer.allRequiredFilled = () => {
          return fieldContainer.fields.every((field: Field) => {
            return (field.required == 't' && !(field.value == '' || field.value == undefined)) || field.required == 'f'
          })
        }
      }

      // section's accordions
      let sections_accordions = this.formDataService.accordions.filter(accordion => accordion.section_id == section.id)
      section.accordions = _.cloneDeep(sections_accordions)
      for (let accordion of section.accordions) {
        let accordions_field_containers = this.formDataService.fieldContainers.filter(fieldContainer => fieldContainer.accordion_id == accordion.id)
        accordion.fans = [_.cloneDeep(accordions_field_containers)]
        for (let fieldContainer of accordion.fans[0]) { // only need to access the first/ only fan
          let field_containers_fields = this.formDataService.fields.filter(field => field.field_container_id == fieldContainer.id)
          fieldContainer.fields = _.cloneDeep(field_containers_fields)
          fieldContainer.allRequiredFilled = () => {
            return fieldContainer.fields.every((field: Field) => {
              return (field.required == 't' && !(field.value == '' || field.value == undefined)) || field.required == 'f'
            })  
          }
        }
        accordion.allRequiredFilled = () => {
          return accordion.fans.every((fan) => {
            return fan.every((fieldContainer) => {
              return fieldContainer.fields.every((field: Field) => {
                return (field.required == 't' && !(field.value == '' || field.value == undefined)) || field.required == 'f'
              })            
            })
          })
        }
      }

      section.allRequiredFilled = () => {
        return section.field_containers.every((fieldContainer: FieldContainer) => fieldContainer.allRequiredFilled())
        && section.accordions.every((accordion: Accordion) => accordion.allRequiredFilled())
      }
    }

    let masterPage: Page = {
      id: '0',
      page_name: 'master page',
      page_index: '0',
      css_class: '',
      sections: sections,
      allRequiredFilled: () => {
        return masterPage.sections.every((section) => {
          return section.allRequiredFilled()
        }
      )}
    }

    return masterPage
  }

  public logForm() {
    console.log(this.reports[this.reportIndex])
  }

  // the idea is to make it work with the valuesToSQL method in bhims-entry.js so we need (values, tableName, timestamp)
  // We can get timestamp when we submit the form
  // Group each field by table name.
  public exportReports(): string {
    return JSON.stringify(this.reports)
  }
}