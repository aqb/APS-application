import IRepositorioCarrinhos from "../dados/Carrinho/IRepositorioCarrinhos";
import RepositorioCarrinhosInMemory from "../dados/Carrinho/RepositorioCarrinhosInMemory/RepositorioCarrinhosInMemory";
import IRepositorioClientes from "../dados/Cliente/IRepositorioClientes";
import RepositorioClientesInMemory from "../dados/Cliente/RepositorioClientesInMemory/RepositorioClientesInMemory";
import IRepositorioEstoque from "../dados/Estoque/IRepositorioEstoque";
import RepositorioEstoqueInMemory from "../dados/Estoque/RepositorioEstoqueInMemory/RepositorioEstoqueInMemory";
import IRepositorioPedidos from "../dados/Pedido/IRepositorioPedidos";
import RepositorioPedidosInMemory from "../dados/Pedido/RepositorioPedidosInMemory/RepositorioPedidosInMemory";
import IFabricaRepositorios from "./IFabricaRepositorios";

class FabricaRepositoriosInMemory implements IFabricaRepositorios {
  criarRepositorioClientes(): IRepositorioClientes {
    return new RepositorioClientesInMemory();
  }

  criarRepositorioCarrinhos(): IRepositorioCarrinhos {
    return new RepositorioCarrinhosInMemory();
  }

  criarRepositorioEstoque(): IRepositorioEstoque {
    return new RepositorioEstoqueInMemory();
  }

  criarRepositorioPedidos(): IRepositorioPedidos {
    return new RepositorioPedidosInMemory();
  }
}

export default FabricaRepositoriosInMemory;
