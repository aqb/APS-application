import ItemPedido from "../../negocio/Item/ItemPedido";
import Pedido from "../../negocio/Pedido/Pedido";

interface IRepositorioPedidos {
  adicionar(pedido: Pedido): void;
  pegarPedidos(clienteId: string): Pedido[];
  pegarPedido(pedidoId: string): Pedido;
  confirmarPedido(pedidoId: string): void;
  cancelarPedido(pedidoId: string): void;
}

export default IRepositorioPedidos;
