import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { HttpMethod, CustomHttpResponseError } from "../interfaces/http.error.interface";
import { ErrorStore } from "../store/http.errors.store";
import { inject } from "@angular/core";

export class ErrorHandlerUtil{

    private _store =inject(ErrorStore);

    handleError(error: HttpErrorResponse, method: HttpMethod): void{
        let statusText;
        const message:CustomHttpResponseError['message'] =error.error.message
          ? error.error.message
          : error.error.messages
          ? error.error.messages
          : error.message
      
        let statusCode =(error.status || error.error.statusCode) as HttpStatusCode
      
        switch (statusCode) {
          case HttpStatusCode.BadRequest:
            statusText ='Bad Request'
            break;
      
          case HttpStatusCode.Unauthorized:
            statusText ='Unauthorized Access'
            break;
            
          case HttpStatusCode.Forbidden:
            statusText ='Forbidden Access'
            break;
      
          case HttpStatusCode.NotFound:
            statusText ='Not Found'
            break;
      
          case HttpStatusCode.MethodNotAllowed:
            statusText ='Method Not Allowed'
            break;
      
          case HttpStatusCode.Conflict:
            statusText ='Conflict'
            break;
      
          case HttpStatusCode.InternalServerError:
            statusText ='Server Error'
            break;
          
          default:
            statusText ='Unknown Error';
            statusCode =['POST', 'PUT', 'PATCH'].includes(method)
                        ? HttpStatusCode.BadRequest 
                        : HttpStatusCode.InternalServerError
            break;
        }
    
        this._store.setError({message, method, statusCode, statusText})
    }

}
