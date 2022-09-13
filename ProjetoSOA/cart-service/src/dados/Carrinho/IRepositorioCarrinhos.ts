import Carrinho from "../../negocio/Carrinho/Carrinho";
import Cliente from "../../negocio/Usuario/Usuario";

interface IRepositorioCarrinhos {
  adicionar(cliente: Cliente): void;
  pegarCarrinhoDe(clienteId: string): Carrinho;
  atualizarCarrinho(carrinho: Carrinho): void;
  limparCarrinho(carrinho: Carrinho): void;
}

export default IRepositorioCarrinhos;
