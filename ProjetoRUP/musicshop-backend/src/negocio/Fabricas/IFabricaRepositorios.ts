import IRepositorioCarrinhos from "../../../dados/Carrinho/IRepositorioCarrinhos";
import IRepositorioClientes from "../../../dados/Cliente/IRepositorioClientes";
import IRepositorioEstoque from "../../../dados/Estoque/IRepositorioEstoque";
import IRepositorioPedidos from "../../../dados/Pedido/IRepositorioPedidos";

interface IFabricaRepositorios {
  criarRepositorioClientes(): IRepositorioClientes;
  criarRepositorioCarrinhos(): IRepositorioCarrinhos;
  criarRepositorioEstoque(): IRepositorioEstoque;
  criarRepositorioPedidos(): IRepositorioPedidos;
}

export default IFabricaRepositorios;
