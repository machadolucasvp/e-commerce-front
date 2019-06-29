import { Component, OnInit } from '@angular/core';
import { PagamentoDTO } from 'src/models/pagamento.dto';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PassDataService } from 'src/services/passdata.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {
  pagamento: PagamentoDTO;
  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12];
  tipo_pagamento: number[] = [1,2];
  formGroup: FormGroup;

    constructor(public passData: PassDataService,public router: Router,public formBuilder: FormBuilder) { 
      this.formGroup = this.formBuilder.group({
        numeroDeParcelas: [1, Validators.required],
        tipo_pagamento: [,Validators.required]
    });
  }

    ngOnInit(){

    }

    confPedido(pagamento: PagamentoDTO){
      pagamento=this.formGroup.value;
      this.passData.setData(pagamento);
      this.router.navigateByUrl('confpedido');
    }
  }


  