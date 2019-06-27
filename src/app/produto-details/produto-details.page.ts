import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'src/services/domain/produtos.service';
import { ProdutoDTO } from 'src/models/produto.dto';
import { API_CONFIG } from 'src/config/api.config';
import { PedidoService } from 'src/services/domain/pedido.service';

@Component({
  selector: 'app-produto-details',
  templateUrl: './produto-details.page.html',
  styleUrls: ['./produto-details.page.scss'],
})
export class ProdutoDetailsPage implements OnInit {

  produto: any;

  cod_produtoAux: any; 

  constructor(public staticRouter: Router,public cartService: PedidoService,public produtoService: ProdutoService, public router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(response=>{
      console.log(response);
      console.log("ta saindo algo ?");
      this.cod_produtoAux=response['cod_produto'];
      console.log(this.cod_produtoAux);
      this.produtoService.findById(response.cod_produto).subscribe(response=>{
        console.log(response);
        this.produto=response;
        console.log(this.produto);
        this.getImageIfExists();
      },
      error => {});
    },
    error => {});
  }
  getImageIfExists() {
    this.produtoService.getImageFromBucket(this.produto.cod_produto)
    .subscribe(response => {
      this.produto.imageUrl = `${API_CONFIG.bucket}/prod${this.produto.cod_produto}.jpg`;
    },
    error => {
    });
  }

  addCart(produto: ProdutoDTO){
    this.cartService.addProduto(produto);
    this.staticRouter.navigateByUrl("carrinho");

  }

}
