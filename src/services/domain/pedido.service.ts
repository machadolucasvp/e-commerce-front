import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { Cart } from 'src/models/cart.dto';
import { ProdutoDTO } from 'src/models/produto.dto';

@Injectable()
export class PedidoService{
  
    
    constructor(public storageService: StorageService){
    }


    createOrCleanCart(): Cart{
        let cart : Cart={Items: []}; 
        this.storageService.setCart(cart);
        return cart;
    }

    getCart(): Cart{
        let cart: Cart = this.storageService.getCart();
        if(cart!=null){
            return cart;
        }
        else{
            return cart=this.createOrCleanCart();
        }
    }

    addProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.Items.findIndex(x => x.produto.cod_produto == produto.cod_produto);
        if (position == -1) {
            cart.Items.push({quantidade: 1, produto: produto});
        }
        this.storageService.setCart(cart);
        return cart;
    }
    removeProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.Items.findIndex(x => x.produto.cod_produto == produto.cod_produto);
        if (position != -1) {
            cart.Items.splice(position,1);
        }
        this.storageService.setCart(cart);
        return cart;
    }
    increaseProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.Items.findIndex(x => x.produto.cod_produto == produto.cod_produto);
        if (position != -1) {
            cart.Items[position].quantidade++;
        }
        this.storageService.setCart(cart);
        return cart;
    }
    decreaseProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.Items.findIndex(x => x.produto.cod_produto == produto.cod_produto);
        if (position != -1) {
            cart.Items[position].quantidade--;
            if (cart.Items[position].quantidade < 1) {
                cart = this.removeProduto(produto);
            }
        }
        this.storageService.setCart(cart);
        return cart;
    }

    total() : number {
        let cart = this.getCart();
        let sum = 0;
        for (var i=0; i<cart.Items.length; i++) {
            sum += cart.Items[i].produto.preco * cart.Items[i].quantidade;
        }
        return sum;
    }



}