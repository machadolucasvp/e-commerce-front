import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { EstadoService } from 'src/services/domain/estados.service';
import { CidadesService } from 'src/services/domain/cidades.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ClienteNewDTO } from 'src/models/clientenew.dto';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formGroup: FormGroup;
  estado: string[];
  cidades: string[];

  constructor(public router: Router,public alertController: AlertController, public clienteService: ClienteService, public formBuilder: FormBuilder,public estadoService: EstadoService,public cidadeService: CidadesService) { 
    this.formGroup=this.formBuilder.group({
      nome: ['Joaquim', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      cpf : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha : ['123', [Validators.required]],
      logradouro : ['Rua Via', [Validators.required]],
      numero : ['25', [Validators.required]],
      complemento : ['Apto 3', []],
      bairro : ['Copacabana', []],
      cep : ['10828333', [Validators.required]],
      telefone1 : ['977261827', [Validators.required]],
      telefone2 : ['', []],
      estado : ['null', [Validators.required]],
      cidade : ['null', [Validators.required]]  
    });
  }

  ngOnInit() {
    this.estado=this.estadoService.findAll();
    this.updateCidades();
  }
  updateCidades(){
    let estadoAux = this.formGroup.value.estado;
    this.cidades=this.cidadeService.findByEstado(estadoAux);
    this.formGroup.controls.cidade.setValue(null);
  }

  signupUser(){
    this.clienteService.insert(this.formGroup.value).subscribe(reponse => {
      this.alertOkay();
    },
    error =>{this.alertNotOKay()});
  }

  async alertNotOKay() {
    let alert = await this.alertController.create({
      header: 'Erro de Validação',
      message: 'Email já cadastrado',
      buttons: [
            {text: 'Ok'}
        ]
      });
      await alert.present();
  }

  async alertOkay() {
    let alert = await this.alertController.create({
      header: 'Envio de Formulário',
      message: 'Cadasto efetuado com Sucesso!',
      buttons: [
            {text: 'Ok',
            role: 'cancel',
          handler: () =>{
            this.router.navigateByUrl("home");
          }}
        ]
      });
      await alert.present();
  }

}
