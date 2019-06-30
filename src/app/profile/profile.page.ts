import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { API_CONFIG } from 'src/config/api.config';
import { Router } from '@angular/router';
import { ImageUtilService } from 'src/services/image.service';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  profileImage;

  selectedFile: any = {};

  endereco: EnderecoDTO;

  cliente : ClienteDTO;
  
  constructor(public alertController: AlertController,public imageService: ImageUtilService,public router: Router, public localStorage: StorageService,public clienteService: ClienteService) { 
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
        this.endereco = this.cliente['endereco'];
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
  onFileSelected(event){
    this.selectedFile=<File>event.target.files[0];
  }
  upload(){
    this.clienteService.uploadPicture(this.selectedFile).subscribe(response=>{
      this.alertOkay();

    }, error => {});
  }

  async alertOkay() {
    let alert = await this.alertController.create({
      header: 'Foto de profile',
      message: 'Atualizada com sucesso!',
      buttons: [
            {text: 'Ok',
            role: 'cancel',
          handler: () =>{
            this.ngOnInit();
          }}
        ]
      });
      await alert.present();
  }

}
