import Pedido from "../../negocio/Pedido/Pedido";
import Carrinho from "../../negocio/Produto/Carrinho/Carrinho";

interface IRepositorioPedidos {
  adicionar(clienteId: string, carrinho: Carrinho): Pedido;
  pegarPedidos(clienteId: string): Pedido[];
  pegarPedido(pedidoId: string): Pedido;
  confirmarPedido(pedidoId: string): void;
  cancelarPedido(pedidoId: string): void;
}

export default IRepositorioPedidos;
