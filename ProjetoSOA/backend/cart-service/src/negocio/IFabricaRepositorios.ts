import IRepositorioCarrinhos from "../dados/Carrinho/IRepositorioCarrinhos";

interface IFabricaRepositorios {
  criarRepositorioCarrinhos(): IRepositorioCarrinhos;
}

export default IFabricaRepositorios;
