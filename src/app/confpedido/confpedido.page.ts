import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { PagamentoDTO } from 'src/models/pagamento.dto';
import { PassDataService } from 'src/services/passdata.service';
import { PedidoDTO } from 'src/models/pedido.dto';
import { CartItem } from 'src/models/cart-item.dto';
import { PedidoService } from 'src/services/domain/pedido.service';
import { clienteRefDTO } from 'src/models/clienteRef.dto';
import { PedidoNewService } from 'src/services/pedidoNew.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-confpedido',
  templateUrl: './confpedido.page.html',
  styleUrls: ['./confpedido.page.scss'],
})
export class ConfpedidoPage implements OnInit {
  
  cliente: ClienteDTO;
  cartItems: CartItem[];
  pagamento: PagamentoDTO;
  pedido: PedidoDTO = {};
  clienteRefDTO: clienteRefDTO = {};
  clienteFindedById: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(public staticRouter: Router,public alertController: AlertController,public pedidoNewService: PedidoNewService,public pedidoService: PedidoService,private passData: PassDataService, public router: ActivatedRoute, public localStorage: StorageService,public clienteService: ClienteService) {
   }

  ngOnInit() {
    let localUser = this.localStorage.getLocalUser();
    this.pagamento=this.passData.getData() as PagamentoDTO;
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email).subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.clienteRefDTO['cod_cliente']=this.cliente['cod_cliente'];
        this.pedido['pagamento']=this.pagamento;
        this.pedido['cliente']=this.clienteRefDTO;
        this.pedido['itempedido']=this.pedidoService.getCart().Items;
        this.cartItems=this.pedidoService.getCart().Items;
        this.endereco=response['endereco'];
      }, error=>{});
    
    }
  }
  total(){
    return this.pedidoService.total();
  }

  postPedido(){
    this.clienteService.findById(this.cliente['cod_cliente']).subscribe(response => {
      this.clienteFindedById=response as ClienteDTO;
      if(this.clienteFindedById['email']===this.cliente['email']){
        console.log("Postando pedido....");
        console.log(this.pedido);
        console.log(this.pedido);
        this.pedidoNewService.postPedido(this.pedido).subscribe(reponse => {
          this.alertOkay();
        },
        error =>{});
      }

        
  
    }, error =>{});
  }

  async alertOkay() {
    let alert = await this.alertController.create({
      header: 'Pedido efetuado com Sucesso!',
      message: 'Cheque a sua caixa de email',
      buttons: [
            {text: 'Ok',
            role: 'cancel',
          handler: () =>{
            this.staticRouter.navigateByUrl("categorias");
          }}
        ]
      });
      await alert.present();
  }

}

