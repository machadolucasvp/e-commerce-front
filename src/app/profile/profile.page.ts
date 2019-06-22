import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  cliente : ClienteDTO;
  constructor(public localStorage: StorageService,public clienteService: ClienteService) { 
  }

  ngOnInit() {
    let localUser = this.localStorage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email).subscribe(response => {
        this.cliente = response;
      },
      error => {});
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.cod_cliente)
    .subscribe(response => {
      this.cliente.image = `${API_CONFIG.bucket}/cp${this.cliente.cod_cliente}.jpg`;
    },
    error => {
    });
  }


}
