import { Injectable } from '@angular/core';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';
import { LocalUser } from 'src/models/local_users';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PedidoService } from './domain/pedido.service';


@Injectable()
export class AuthService{



    jwtHelper: JwtHelperService = new JwtHelperService();
    constructor(public cartService: PedidoService, public http: HttpClient,public storageService: StorageService){

    }


    authenticate(auth : CredenciaisDTO ){
        return this.http.post(`${API_CONFIG.baseUrl}/login`,auth,
        {
            observe: 'response',
            responseType: 'text'
        });
    }
    refreshToken(){
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`,{},
        {
            observe: 'response',
            responseType: 'text'
        });
    }

    sucessfullLogin(authorizationValue : string){
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storageService.setLocalUser(user);
        this.cartService.createOrCleanCart();
    }
    

    logout(){
        this.storageService.setLocalUser(null);
        
    }

}