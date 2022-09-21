import IRepositorioUsuarios from "../dados/Usuario/IRepositorioUsuarios";

interface IFabricaRepositorios {
  criarRepositorioUsuarios(): IRepositorioUsuarios;
}

export default IFabricaRepositorios;
