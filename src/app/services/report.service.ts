import { Injectable } from '@angular/core';
import { Accordion, Field, FieldContainer, FormService, Page, Section } from './form.service';
import { FormDataService } from './form-data.service';
const _ = require('lodash')
import { Directory, Filesystem } from '@capacitor/filesystem';
import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage-angular'



@Injectable({
  providedIn: 'root'
})
export class ReportService {

  public reports: Page[]
  public reportIndex: number
  public currentPage: Page

  constructor(public formDataService: FormDataService, public storageService: StorageService) {
    
    this.reports = []
    this.reportIndex = -1 // initialize not selecting anything
    let newCurrentPage = this.initializeMasterPage()
    this.addAllRequiredFilled(newCurrentPage)
    this.currentPage = newCurrentPage

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

  // todo: add better UI for deleting report. Now its a bit cryptic.
  public deleteReport(index: number) {
    if (this.reports.length > 1 && this.reportIndex != index) {
      this.reports.splice(index, 1)
      if (this.reportIndex > this.reports.length - 1) {
        this.reportIndex = this.reports.length - 1
      }
    }
  }

  // saves the currently opened report
  public saveReport() {
    if (this.reportIndex == -1) {
      this.reports.push(_.cloneDeep(this.currentPage))
      this.reportIndex = this.reports.length - 1 // the last report
    } 
    else {
      this.reports[this.reportIndex] = _.cloneDeep(this.currentPage)
    }
  }

  public selectReport(index: number) {
    console.log("switching reports to report: " + (index + 1).toString())
    this.reportIndex = index
    let newCurrentPage = _.cloneDeep(this.reports[index])
    this.addAllRequiredFilled(newCurrentPage)
    this.currentPage = newCurrentPage
    console.log(this.currentPage)
  }

  public createAlertButtons(index: number) {
    return [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {},
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.selectReport(index)
        },
      },
    ];
  }

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

  // do not display if field depends on dropdown val == other
  // clear val of "other" if user changes it away from "other"
  public displayField(field: Field, section: Section) {
    if (field.field_name?.includes('attachment')) { return false };
    if (field.calculation_target) { return false } //todo: implement this (unit conversions)
    if (field.dependent_target != null) {
      let dependent_field_name = field.dependent_target.substring(7) + "_code" // shift to get field name
      let sectionsFields = section.field_containers.flatMap((fieldContainer)=>fieldContainer.fields)
      let dependent_field = sectionsFields.find((field) => field.field_name == dependent_field_name) as Field
      if (dependent_field == undefined) {
        dependent_field_name = field.dependent_target.substring(7) // some dependent targets don't include '_code'
        dependent_field = sectionsFields.find((field) => field.field_name == dependent_field_name) as Field
      } 
      if (field.dependent_value.split(',').includes(dependent_field?.value)) {
        return true;
      }
      else {
        field.value = ''
        return false
      }
    }
    return true;
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
        }
      }
    }

    let masterPage: Page = {
      id: '0',
      page_name: 'master page',
      page_index: '0',
      css_class: '',
      sections: sections,
      allRequiredFilled: () => {
        return false
      }
    }

    // this.addAllRequiredFilled(masterPage)

    return masterPage
  }

  // Deep cloning and saving does not like functions so we have to redeclare everytime.
  // Todo: maybe move to a class based approach?
  public addAllRequiredFilled(page: Page) {
    page.sections.forEach((section) => {
      section.field_containers.forEach((fieldContainer) => {
        fieldContainer.allRequiredFilled = () => {
          return fieldContainer.fields.every((field: Field) => {
            return ((field.required == 't' && !(field.value == '' || field.value == undefined)) || field.required == 'f') || !this.displayField(field, section)
          })  
        }
      })
      section.accordions.forEach((accordion) => {
        accordion.allRequiredFilled = () => {
          return accordion.fans.every((fan) => {
            return fan.every((fieldContainer) => {
              return fieldContainer.fields.every((field: Field) => {
                return ((field.required == 't' && !(field.value == '' || field.value == undefined)) || field.required == 'f') || !this.displayField(field, section)
              })            
            })
          })
        }        
      })
      section.allRequiredFilled = () => {
        return section.field_containers.every((fieldContainer: FieldContainer) => fieldContainer.allRequiredFilled())
        && section.accordions.every((accordion: Accordion) => accordion.allRequiredFilled())
      }
    })
    page.allRequiredFilled = () => {
      return page.sections.every((section) => {
        return section.allRequiredFilled()
      }
    )}
  }


  // todo: build these into storageService
  public async loadReports() {
    let reports: Page[] = JSON.parse(await this.storageService.get('reports'))

    reports.forEach((report) => {
      this.addAllRequiredFilled(report)
    })

    this.reports = reports
  }

  public async saveReports() {
    await this.storageService.set('reports', JSON.stringify(this.reports))
  }

  public exportReports() {
    return this.reports.map(report => this.exportReport(report))
  }

  // In bhims-form.js _this.fieldValues is a js object.
  // Current plan is to export all of the  reports as a 
  public exportReport(page: Page) {

    // creates a js-like object
    var report: {[k: string]: any} = {};
    
    page.sections.forEach(section => {
      section.field_containers.forEach(fieldContainer => {
        fieldContainer.fields.forEach(field => {
          if (field.value) report[field.field_name] = field.value
        });
      })

      section.accordions.forEach(accordion => {
        var jsAccordion: any[] = []
        accordion.fans.forEach(fan => {
          var jsFan: {[k: string]: any} = {};
          if (fan.some(fieldContainer=>fieldContainer.fields.some(field=>field.value))) {
            fan.forEach(fieldContainer => {
              fieldContainer.fields.forEach(field => {
                jsFan[field.field_name] = field.value == undefined ? '' : field.value
              })
            })
            jsAccordion.push(jsFan)
          }
        }) 
        if (jsAccordion.length) report[accordion.table_name] = this.accordionArrayToObjectArray(jsAccordion)
      })
    });
    // console.log(report)
    // return JSON.stringify(report)
    return report
  }

  // have to do conversion to get an array to look like it does in _this.fieldValues of bhims-form.js
  private accordionArrayToObjectArray(accordion: any[]) {
    var accordionObject: {[k: string]: any} = {};
    accordion.forEach((fan, index) => {
      accordionObject[index] = fan
    })
    return accordionObject
  }

}