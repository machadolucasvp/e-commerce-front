import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { API_CONFIG } from 'src/config/api.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  Categorias: CategoriaDTO[];

  bucket: String = API_CONFIG.bucket;

  constructor(public router: Router,public categoriaService: CategoriaService) {
    //Rquisição assincrona !
    this.categoriaService.findAll().subscribe(resposta => {
      this.Categorias=resposta;
    },
    error => {
      console.log(error);
    });
   }

  openProdutos(cod_categoria: string){
    this.router.navigate(['produtos',{cod_categoria}]);
  }

  ngOnInit() {
  }


}
