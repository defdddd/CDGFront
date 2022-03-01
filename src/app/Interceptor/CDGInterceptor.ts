import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize, retry} from 'rxjs/operators';
import { AuthService } from '../Services/auth.service';


@Injectable()
export class CDGInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
      // Add Auth Token
      const Token = this.authService.GetToken();
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${Token}`
        }
      });
  
      return next.handle(req)
        .pipe(
          // Retry on failure
          retry(1),
  
          // Handle errors
          catchError((error: HttpErrorResponse) => {
            // TODO: Add error handling logic here
            alert(`HTTP Error: ${req.url} \n ${error.error}`);
            return throwError(error);
          }),
  
          // PROFILING
          finalize(() => {
            const profilingMsg = `${req.method} "${req.urlWithParams}"`;
            console.log(profilingMsg);
          })
          );
    }
  }