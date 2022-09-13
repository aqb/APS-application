import IRepositorioUsuarios from "../dados/Usuario/IRepositorioUsuarios";
import RepositorioUsuariosInMemory from "../dados/Usuario/RepositorioUsuariosInMemory/RepositorioClientesInMemory";
import IFabricaRepositorios from "./IFabricaRepositorios";

class FabricaRepositoriosInMemory implements IFabricaRepositorios {
  criarRepositorioUsuarios(): IRepositorioUsuarios {
    return new RepositorioUsuariosInMemory();
  }
}

export default FabricaRepositoriosInMemory;
