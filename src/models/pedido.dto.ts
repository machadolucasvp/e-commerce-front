import { clienteRefDTO } from './clienteRef.dto';
import { PagamentoDTO } from './pagamento.dto';
import { ItempedidoDTO } from './Itempedido.dto';

export interface PedidoDTO{
    cliente?: clienteRefDTO;
    pagamento?: PagamentoDTO;
    itempedido?: ItempedidoDTO[];
    date_pedido?: Date;


}