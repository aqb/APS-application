import Carrinho from "../../negocio/Carrinho/Carrinho";

interface IRepositorioCarrinhos {
  adicionar(clienteId: string): void;
  pegarCarrinhoDe(clienteId: string): Carrinho;
  atualizarCarrinho(carrinho: Carrinho): void;
  limparCarrinho(clienteId: string): void;
}

export default IRepositorioCarrinhos;
