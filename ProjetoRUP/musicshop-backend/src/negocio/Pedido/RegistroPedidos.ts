import IRepositorioPedidos from "../../dados/IRepositorioPedidos";
import Pedido from "./Pedido";

class RegistroPedidos {
  private repositorioPedidos;

  constructor(repositorioPedidos: IRepositorioPedidos) {
    this.repositorioPedidos = repositorioPedidos;
  }

  public adicionar(pedido: Pedido) {
    this.repositorioPedidos.adicionar(pedido);
  }
}

export default RegistroPedidos;
