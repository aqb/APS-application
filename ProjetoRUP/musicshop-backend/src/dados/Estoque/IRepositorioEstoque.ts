import ItemEstoque from "../../negocio/Produto/Estoque/ItemEstoque";
import Produto from "../../negocio/Produto/Produto";

interface IRepositorioEstoque {
  adicionar(produto: Produto): void;

  pegarItensEstoque(nomeFiltro?: string): ItemEstoque[];

  pegarItemEstoque(produto: Produto): ItemEstoque;

  pegarItemEstoquePeloId(id: string): ItemEstoque;
}

export default IRepositorioEstoque;
