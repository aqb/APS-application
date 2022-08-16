export type Pedido = {
  id: string;
  clienteId: string;
  itens: ItemPedido[];
  status: PedidoStatus;
};

export type ItemPedido = {
  produtoId: string;
  valor: number;
  quantidade: number;
};

enum PedidoStatus {
  PENDENTE,
  FINALIZADO,
  CANCELADO
}
