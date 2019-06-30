import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';


@Injectable()
export class ImageUtilService{
    constructor(public http: HttpClient){

    }
    uploadFile(file){
        const fd = new FormData();
        fd.append('file',file,file.name);
        return this.http.post(`${API_CONFIG.baseUrl}/clientes/picture`,file);
    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  


    dataUriToBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }
}