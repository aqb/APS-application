import IRepositorioCarrinhos from "../dados/Carrinho/IRepositorioCarrinhos";
import RepositorioCarrinhosInMemory from "../dados/Carrinho/RepositorioCarrinhosInMemory/RepositorioCarrinhosInMemory";
import IFabricaRepositorios from "./IFabricaRepositorios";

class FabricaRepositoriosInMemory implements IFabricaRepositorios {
  criarRepositorioCarrinhos(): IRepositorioCarrinhos {
    return new RepositorioCarrinhosInMemory();
  }
}

export default FabricaRepositoriosInMemory;
