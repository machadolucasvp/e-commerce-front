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
      this.cod_produtoAux=response['cod_produto'];
      this.produtoService.findById(response.cod_produto).subscribe(response=>{
        this.produto=response;
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
