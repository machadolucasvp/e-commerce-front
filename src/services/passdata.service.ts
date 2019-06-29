import { Injectable } from '@angular/core';

@Injectable()
export class PassDataService{
    private data: any;
    private localData: any;

    public setData(data : any){
        this.data=data;
    }
    public getData(){
        this.localData = this.data;
        this.data=null;
        return this.localData;
    }
}