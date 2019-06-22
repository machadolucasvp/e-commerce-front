import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteDTO } from 'src/models/cliente.dto';
import { API_CONFIG } from 'src/config/api.config';

@Injectable()
export class ClienteService{
    constructor(public http: HttpClient){

    }

    findByEmail(email: String) :Observable<ClienteDTO>{
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);

    }

    getImageFromBucket(cod_cliente : string) : Observable<any> {
        let url = `${API_CONFIG.bucket}/cp${cod_cliente}.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }
}