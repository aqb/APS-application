import Carrinho from "../../negocio/Produto/Carrinho/Carrinho";

interface IRepositorioCarrinhos {
  adicionar(carrinho: Carrinho): void;
  pegarCarrinhoDe(clienteId: string): Carrinho;
  atualizarCarrinho(carrinho: Carrinho): void;
  limparCarrinho(clienteId: string): void;
}

export default IRepositorioCarrinhos;
