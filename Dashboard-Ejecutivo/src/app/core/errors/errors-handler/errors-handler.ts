
import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
;

import { ErrorsService } from '../errors-service/errors.service';
import { NotificationService } from '../../../services/notification.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(
    private injector: Injector,
  ) {}
  
  handleError(error) {
    
     const notificationService = this.injector.get(NotificationService);
    const errorsService = this.injector.get(ErrorsService);
    const router = this.injector.get(Router);
    const toastManager = this.injector.get(ToastrService);
    
    
    if (error instanceof HttpErrorResponse) {      
     // Server error happened     
      if (!navigator.onLine) {
        // No Internet connection
         toastManager.error('No Internet Connection','Error');
      }
      // Http Error
      // Send the error to the server
      if(error.status == 500){
        toastManager.error('Something went wrong, Internal server error!','Oops. :(');
      }
      if(error.status == 400){
        toastManager.error(error.error, 'Algo salio mal');
      }
      if(error.status == 404){
        router.navigate(['/home']);
      }

      if(error.status == 402){
        router.navigate(['/home']);
      }

      if (error.status == 400) {
        router.navigate(['/home']);
      }
      //errorsService.log(error).subscribe();

      // Show notification to the user
      return notificationService.notify(`${error.status} - ${error.message}`);
    } else {
      // Client Error Happend
      // Send the error to the server and then
      // redirect the user to the page with all the info
      errorsService
          .log(error)
          .subscribe(errorWithContextInfo => {
            router.navigate(['/error'], { queryParams: errorWithContextInfo });
        });
    }
  }


}

