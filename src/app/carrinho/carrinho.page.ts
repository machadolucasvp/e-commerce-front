import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/services/domain/pedido.service';
import { CartItem } from 'src/models/cart-item.dto';
import { StorageService } from 'src/services/storage.service';
import { ProdutoService } from 'src/services/domain/produtos.service';
import { API_CONFIG } from 'src/config/api.config';
import { ProdutoDTO } from 'src/models/produto.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  Items: CartItem[];

  constructor(public router: Router, public produtoService: ProdutoService,public cartService: PedidoService,public storageService: StorageService) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    let cart = this.cartService.getCart();
    this.Items=cart.Items;
    this.getImageIfExists();

  }

  getImageIfExists() {
    for(var i=0;i<this.Items.length;i++){
        let item=this.Items[i];
        this.produtoService.getImageFromBucket(item.produto.cod_produto)
      .subscribe(response => {
        item.produto.imageUrl = `${API_CONFIG.bucket}/prod${item.produto.cod_produto}.jpg`;
      },
      error => {
      });
    }
  }  

  removeItem(produto: ProdutoDTO) {
    this.Items = this.cartService.removeProduto(produto).Items;
  }

  increaseProduto(produto: ProdutoDTO) {
    this.Items = this.cartService.increaseProduto(produto).Items;
  }

  decreaseProduto(produto: ProdutoDTO) {
    this.Items = this.cartService.decreaseProduto(produto).Items;
  }

  total() : number {
    return this.cartService.total();
  }  
  goOn(){
    this.router.navigateByUrl("categorias");

  }
  isEmpty(){
    if(this.Items.length<=0){
      return true;
    }
    else{
      return false;
    }
  }
  confPedido(){
    this.router.navigateByUrl("pagamento");
  }



}
