import Cliente from "../../negocio/Cliente/Cliente";
import Carrinho from "../../negocio/Produtos/Carrinho/Carrinho";
import Produto from "../../negocio/Produtos/Produto";

interface IRepositorioCarrinhos {
  adicionar(carrinho: Carrinho): void;
  pegarCarrinhoDe(cliente: Cliente): Carrinho;
  atualizarCarrinho(
    carrinho: Carrinho,
    produto: Produto,
    quantidade: number
  ): void;
}

export default IRepositorioCarrinhos;
