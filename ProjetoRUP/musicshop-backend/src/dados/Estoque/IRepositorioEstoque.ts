import Carrinho from "../../negocio/Carrinho/Carrinho";
import ItemEstoque from "../../negocio/Estoque/ItemEstoque";
import Produto from "../../negocio/Produto/Produto";

interface IRepositorioEstoque {
  adicionar(produto: Produto): void;

  pegarItensEstoque(nomeFiltro?: string): ItemEstoque[];

  pegarItemEstoque(produto: Produto): ItemEstoque;

  pegarItemEstoquePeloId(id: string): ItemEstoque;

  reservaItemEstoque(carrinho: Carrinho): void;

  devolverItensAoEstoque(itens: any): void;
}

export default IRepositorioEstoque;
