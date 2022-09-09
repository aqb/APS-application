import Cliente from "../../negocio/Cliente/Cliente";
import ItemPedido from "../../negocio/Item/ItemPedido";
import Pedido from "../../negocio/Pedido/Pedido";

interface IRepositorioPedidos {
  adicionar(cliente: Cliente, itens: ItemPedido[]): Pedido;
  pegarPedidos(clienteId: string): Pedido[];
  pegarPedido(pedidoId: string): Pedido;
  confirmarPedido(pedidoId: string): void;
  cancelarPedido(pedidoId: string): void;
}

export default IRepositorioPedidos;
