import {AbstractControl,AsyncValidatorFn,ValidationErrors,} from '@angular/forms';
import * as moment from 'moment';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
import { AppointmentService } from '../Services/appointment.service';
import { DateHelper } from './DateHelper';


export class AppointmentValidator {
    static checkDate(Service: AppointmentService , editData?:any):AsyncValidatorFn  {
        return (control: AbstractControl) => {
            var data = DateHelper.getDate(control.value);
            return Service.checkAppointmentDate(data)
                .pipe(
                    map(date =>
                        {
                        if(data == editData) return null;
                        if(control.value < Date.now()) return {date : true};
                        return date ? null : {date : true}
                    }
                )
            );
        }
    }
  }