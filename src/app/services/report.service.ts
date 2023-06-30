import { Injectable } from '@angular/core';
import { FormService, Page } from './form.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  public reports: Page[]
  public reportIndex: number

  // todo: move initializeMasterPage here to get rid of circular dependency
  constructor() {
    
    this.reports = []

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
    
  }

  public deleteReport(index: number) {
    if (this.reports.length > 1) {
      this.reports.splice(index, 1)
    }
  }



}
