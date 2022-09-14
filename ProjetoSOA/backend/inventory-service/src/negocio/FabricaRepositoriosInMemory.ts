import IRepositorioEstoque from "../dados/Estoque/IRepositorioEstoque";
import RepositorioEstoqueInMemory from "../dados/Estoque/RepositorioEstoqueInMemory/RepositorioEstoqueInMemory";
import IFabricaRepositorios from "./IFabricaRepositorios";

class FabricaRepositoriosInMemory implements IFabricaRepositorios {
  criarRepositorioEstoque(): IRepositorioEstoque {
    return new RepositorioEstoqueInMemory();
  }
}

export default FabricaRepositoriosInMemory;
