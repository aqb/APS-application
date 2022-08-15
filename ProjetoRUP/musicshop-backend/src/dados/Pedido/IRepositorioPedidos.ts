import ItemPedido from "../../negocio/Pedido/ItemPedido";
import Pedido from "../../negocio/Pedido/Pedido";

interface IRepositorioPedidos {
  adicionar(clienteId: string, itens: ItemPedido[]): Pedido;
  pegarPedidos(clienteId: string): Pedido[];
  pegarPedido(pedidoId: string): Pedido;
  confirmarPedido(pedidoId: string): void;
  cancelarPedido(pedidoId: string): void;
}

export default IRepositorioPedidos;
