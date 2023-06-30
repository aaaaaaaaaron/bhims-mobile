import { Injectable } from '@angular/core';
import { FormService, Page } from './form.service';
import { FormDataService } from './form-data.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  public reports: Page[]
  public reportIndex: number

  // todo: move initializeMasterPage here to get rid of circular dependency
  constructor(public formDataService: FormDataService) {
    
    this.reports = [formDataService.initializeMasterPage()]

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
    this.reports.push(this.formDataService.initializeMasterPage())
  }

  // todo: delete logic can change the selected form sneakily. Maybe build some logic to counter that.
  public deleteReport(index: number) {
    if (this.reports.length > 1) {
      this.reports.splice(index, 1)
      if (this.reportIndex > this.reports.length - 1) {
        // console.log("switching reports to report: " + (this.reports.length - 1 + 1).toString())
        this.reportIndex = this.reports.length - 1
      }
    }
  }

  public selectReport(index: number) {
    console.log("switching reports to report: " + (index + 1).toString())
    this.reportIndex = index
  }



}
