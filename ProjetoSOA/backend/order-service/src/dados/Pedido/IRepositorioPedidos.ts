import ItemPedido from "../../negocio/Item/ItemPedido";
import Pedido from "../../negocio/Pedido/Pedido";
import Usuario from "../../negocio/Usuario/Usuario";

interface IRepositorioPedidos {
  adicionar(cliente: Usuario, itens: ItemPedido[]): Pedido;
  pegarPedidos(clienteId: string): Promise<Pedido[]>;
  pegarPedido(pedidoId: string): Promise<Pedido>;
  confirmarPedido(pedidoId: string): void;
  cancelarPedido(pedidoId: string): void;
}

export default IRepositorioPedidos;
