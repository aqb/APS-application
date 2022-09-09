import { Produto } from "./Produto";

export type Pedido = {
  id: string;
  clienteId: string;
  itens: ItemPedido[];
  status: PedidoStatus;
};

export type ItemPedido = {
  produto: Produto;
  valor: number;
  quantidade: number;
};

enum PedidoStatus {
  PENDENTE = "Pendente",
  FINALIZADO = "Finalizado",
  CANCELADO = "Cancelado"
}
