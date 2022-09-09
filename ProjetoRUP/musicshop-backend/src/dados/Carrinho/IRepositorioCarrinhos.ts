import Carrinho from "../../negocio/Carrinho/Carrinho";
import Cliente from "../../negocio/Cliente/Cliente";

interface IRepositorioCarrinhos {
  adicionar(cliente: Cliente): void;
  pegarCarrinhoDe(clienteId: string): Carrinho;
  atualizarCarrinho(carrinho: Carrinho): void;
  limparCarrinho(carrinho: Carrinho): void;
}

export default IRepositorioCarrinhos;
