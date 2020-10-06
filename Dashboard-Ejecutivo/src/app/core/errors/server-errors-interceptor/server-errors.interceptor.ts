import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { tap} from 'rxjs/operators';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/retry';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastManager: ToastrService
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger
    let url = request.url.split('/');
    if(url[2] == 'auth' || url[1] == 'externalauth'){
      return next.handle(request)
        .pipe(
          tap(event => {
            if(event instanceof HttpResponse){
              
            }
          }, error => {
            if(error.status == 511){
              this.router.navigate(['/login-error']);
            }
            else{
              this.toastManager.error(error.error, 'Error');
            }
            
          })
        )
    }
    return next.handle(request)
  }
}
