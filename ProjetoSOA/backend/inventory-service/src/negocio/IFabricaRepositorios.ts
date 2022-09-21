import IRepositorioEstoque from "../dados/Estoque/IRepositorioEstoque";

interface IFabricaRepositorios {
  criarRepositorioEstoque(): IRepositorioEstoque;
}

export default IFabricaRepositorios;
