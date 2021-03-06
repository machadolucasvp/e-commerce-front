import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoDTO } from 'src/models/produto.dto';


@Injectable()
export class ProdutoService{

    constructor(public http: HttpClient){
    }

    findByCategoria(cod_categoria: string){
        return this.http.get(`${API_CONFIG.baseUrl}/produtos?categorias=${cod_categoria}`);
    
    }

    findById(cod_produto: string){
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${cod_produto}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucket}/prod${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
      }  

    
}