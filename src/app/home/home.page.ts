import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CredenciaisDTO } from 'src/models/credenciais.dto';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  auth: CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(public router: Router,public menu: MenuController,public authentication : AuthService){}    
  public login(){
    this.authentication.authenticate(this.auth).subscribe(
      response =>{
        this.authentication.sucessfullLogin(response.headers.get('Authorization'));
        this.router.navigateByUrl("categorias");

      },
      error => {

      }
    );
  }

  ionViewWillEnter(){
    this.menu.enable(false);
  }
  ionViewWillLeave(){
    this.menu.enable(true);
  }

}
