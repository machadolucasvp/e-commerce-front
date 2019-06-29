import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PedidoDTO } from 'src/models/pedido.dto';
import { API_CONFIG } from 'src/config/api.config';

@Injectable()
export class PedidoNewService{

    constructor(public http: HttpClient){
    }

    postPedido(pedido: PedidoDTO){
        console.log("estou tentando fazer a requisição");
        return this.http.post(`${API_CONFIG.baseUrl}/pedidos`,pedido,{
            observe: 'response',
            responseType: 'text'
        });
    }
}