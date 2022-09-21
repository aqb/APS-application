import { container, inject, injectable, singleton } from "tsyringe";

import IRepositorioPedidos from "../dados/Pedido/IRepositorioPedidos";
import IFabricaRepositorios from "./IFabricaRepositorios";
import ControladorPedido from "./Pedido/ControladorPedido";
import Pedido from "./Pedido/Pedido";

@injectable()
@singleton()
class Fachada {
  private controladorPedido;

  constructor(
    @inject("FabricaRepositorios") fabricaRepositorios: IFabricaRepositorios
  ) {
    container.register<IRepositorioPedidos>("RepositorioPedidos", {
      useValue: fabricaRepositorios.criarRepositorioPedidos()
    });
    this.controladorPedido = container.resolve(ControladorPedido);
  }

  public async pegarPedidos(clienteId: string): Promise<Pedido[]> {
    return await this.controladorPedido.pegarPedidos(clienteId);
  }

  public async pegarPedido(pedidoId: string): Promise<Pedido> {
    return await this.controladorPedido.pegarPedido(pedidoId);
  }

  public async realizarPedido(
    authHeader: string,
    carrinhoId: string,
    metodoPagamento: string,
    infoPagamento: any
  ): Promise<Pedido> {
    const pedido = await this.controladorPedido.realizarPedido(
      authHeader,
      carrinhoId,
      metodoPagamento,
      infoPagamento
    );

    return pedido;
  }
}

export default Fachada;
