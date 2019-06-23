import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { EstadoService } from 'src/services/domain/estados.service';
import { CidadesService } from 'src/services/domain/cidades.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formGroup: FormGroup;
  estado: string[];
  cidades: string[];

  constructor(public formBuilder: FormBuilder,public estadoService: EstadoService,public cidadeService: CidadesService) { 
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
    let estadoId = this.formGroup.value.estado;
    this.cidades=this.cidadeService.findById(estadoId);
    console.log(this.cidades);
    this.formGroup.controls.cidade.setValue(null);
  }

}
