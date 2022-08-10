import Cliente from "../../negocio/Cliente/Cliente";
import Carrinho from "../../negocio/Produtos/Carrinho/Carrinho";
import Produto from "../../negocio/Produtos/Produto";

interface IRepositorioCarrinhos {
  adicionar(carrinho: Carrinho): void;
  pegarCarrinhoDe(clienteId: string): Carrinho;
  atualizarCarrinho(carrinho: Carrinho): void;
}

export default IRepositorioCarrinhos;
