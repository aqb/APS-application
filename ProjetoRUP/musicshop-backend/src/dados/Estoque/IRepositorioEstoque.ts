import ItemEstoque from "../negocio/Produtos/Estoque/ItemEstoque";
import Produto from "../negocio/Produtos/Produto";

interface IRepositorioEstoque {
  adicionar(produto: Produto): void;

  getItensComNome(nome: string): ItemEstoque[];

  getItemEstoque(produto: Produto): ItemEstoque;
}

export default IRepositorioEstoque;
