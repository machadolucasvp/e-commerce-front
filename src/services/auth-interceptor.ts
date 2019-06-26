import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { catchError } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { API_CONFIG } from 'src/config/api.config';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {


    constructor(public storageService: StorageService){
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            let localUser = this.storageService.getLocalUser();
            let  lengthOfBackEndURL = API_CONFIG.baseUrl.length; 
            let isRequestToBackEnd = req.url.substring(0,lengthOfBackEndURL) == API_CONFIG.baseUrl;
            if(localUser && isRequestToBackEnd){
                const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer '+localUser.token)});
                return next.handle(authReq);
            }
            else{
                return next.handle(req);
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};