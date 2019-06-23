import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ProdutoService{

    constructor(public http: HttpClient){
    }

    findByCategoria(cod_categoria: string){
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${cod_categoria}`);
    
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.baseUrl}/prod${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
      }  

    
}