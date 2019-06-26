import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { API_CONFIG } from 'src/config/api.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  profileImage;


  cliente : ClienteDTO;
  constructor(public router: Router, public localStorage: StorageService,public clienteService: ClienteService) { 
    this.profileImage = 'assets/imgs/avatar-blank.png';
  }


  updateProfileImage(){
    if(this.cliente.image){
      this.profileImage=this.cliente.image;
    }
  }

  ngOnInit() {
    let localUser = this.localStorage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email).subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.getImageIfExists();
      },
      error => {
        if(error.status==403){
          this.router.navigateByUrl('home');
        }
      });
    }
    else{
      this.router.navigateByUrl('home');
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.cod_cliente)
    .subscribe(response => {
      this.cliente.image = `${API_CONFIG.bucket}/cp${this.cliente.cod_cliente}.jpg`;
      this.updateProfileImage();
    },
    error => {
    });
  }


}
