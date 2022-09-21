import IRepositorioPedidos from "../dados/Pedido/IRepositorioPedidos";

interface IFabricaRepositorios {
  criarRepositorioPedidos(): IRepositorioPedidos;
}

export default IFabricaRepositorios;
