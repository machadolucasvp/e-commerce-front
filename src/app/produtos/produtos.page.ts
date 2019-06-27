import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { Router, ActivatedRoute } from '@angular/router';
import { ProdutoService } from 'src/services/domain/produtos.service';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  produtosDTO: ProdutoDTO[];
  cod_categoriaAux: any;
  constructor(public staticRouter: Router,public router: ActivatedRoute,public produtoService: ProdutoService) { }

  ngOnInit() {
    this.router.params.subscribe(response=>{
      this.cod_categoriaAux=response['cod_categoria'];
      console.log(this.cod_categoriaAux);
      this.produtoService.findByCategoria(this.cod_categoriaAux).subscribe(response=>{
        this.produtosDTO=response['content'];
        console.log(this.produtosDTO);
        this.getImageIfExists();
      },
      error => {});
    },
    error => {});
  }

  showDetail(cod_produto: string){
    this.staticRouter.navigate(['produto-details',{cod_produto}]);
  }

//(click)="showDetail(produto.cod_produto) isso aqui vai la no html quando eu fizer a pagina de produto detail
  getImageIfExists() {
    for(var i=0;i<this.produtosDTO.length;i++){
        let produto=this.produtosDTO[i];
        this.produtoService.getImageFromBucket(produto.cod_produto)
      .subscribe(response => {
        produto.imageUrl = `${API_CONFIG.bucket}/prod${produto.cod_produto}.jpg`;
        console.log(produto.imageUrl);
      },
      error => {
      });
    }
  }  

}
