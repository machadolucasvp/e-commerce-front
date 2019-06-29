export interface PagamentoDTO{
    tipo_pagamento: number;
    status?: number;
    numeroDeParcelas?: number;
    dataVencimento?: Date;

}