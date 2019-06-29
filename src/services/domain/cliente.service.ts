import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteDTO } from 'src/models/cliente.dto';
import { API_CONFIG } from 'src/config/api.config';
import { ClienteNewDTO } from 'src/models/clientenew.dto';

@Injectable()
export class ClienteService{
    constructor(public http: HttpClient){

    }
    findById(cod_cliente: String){
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${cod_cliente}`);

    }

    findByEmail(email: String){
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);

    }

    getImageFromBucket(cod_cliente : string) : Observable<any> {
        let url = `${API_CONFIG.bucket}/cp${cod_cliente}.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(cliente: ClienteNewDTO){
        console.log(cliente);
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`,cliente,{
            observe: 'response',
            responseType: 'text'
        });
    }
}