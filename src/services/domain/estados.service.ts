import { Injectable } from '@angular/core';

@Injectable()
export class EstadoService{

    EstadosList: string[];
    constructor(){
        this.EstadosList=['Maranhão','Piaui','Pará'];
    }

    findById(id: number){
        if(this.EstadosList[id]!=null){
            return this.EstadosList[id];
        }
    }
    findAll(){
        return this.EstadosList;
    }

}