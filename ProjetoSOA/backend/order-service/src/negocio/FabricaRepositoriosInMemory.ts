import IRepositorioPedidos from "../dados/Pedido/IRepositorioPedidos";
import RepositorioPedidosInMemory from "../dados/Pedido/RepositorioPedidosInMemory/RepositorioPedidosInMemory";
import IFabricaRepositorios from "./IFabricaRepositorios";

class FabricaRepositoriosInMemory implements IFabricaRepositorios {
  criarRepositorioPedidos(): IRepositorioPedidos {
    return new RepositorioPedidosInMemory();
  }
}

export default FabricaRepositoriosInMemory;
