import Pedido from "../negocio/Pedido/Pedido";

interface IRepositorioPedidos {
  adicionar(pedido: Pedido): void;
}

export default IRepositorioPedidos;
