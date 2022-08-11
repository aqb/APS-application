import ItemEstoque from "../../negocio/Produtos/Estoque/ItemEstoque";
import Produto from "../../negocio/Produtos/Produto";

interface IRepositorioEstoque {
  adicionar(produto: Produto): void;

  pegarItensEstoque(nomeFiltro?: string): ItemEstoque[];

  pegarItemEstoque(produto: Produto): ItemEstoque;

  pegarItemEstoquePeloId(id: string): ItemEstoque;
}

export default IRepositorioEstoque;
