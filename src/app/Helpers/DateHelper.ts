import { Injectable } from "@angular/core";
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";
import { AppointmentService } from "../Services/appointment.service";
@Injectable({
    providedIn: 'root'
  })
export class DateHelper {
    private dates : string[] = [];

    constructor(private service: AppointmentService){
        service.getCurrentDates().subscribe(dates => this.dates = dates);
    }

    static getDate(date : any) {
        return (new Date(date)).toLocaleDateString().replace("/","-").replace("/","-");    
    }

    myFilter = (d: Date | null): boolean => {
        if(d){
        const day = d.getDay();
        return day !== 0 && day !== 6;
        }
        return false;
      }
    
     dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
        var date = DateHelper.getDate(cellDate);
        const bool : boolean = (this.dates.indexOf(date) > -1);
        return bool ? 'custom-date-class' : '';
      };
  }