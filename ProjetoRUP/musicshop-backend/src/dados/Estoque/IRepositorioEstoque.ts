import Item from "../../negocio/Item/Item";
import ItemProps from "../../negocio/Item/ItemProps";

interface IRepositorioEstoque {
  adicionar(item: Item): void;

  adicionarItens(itens: Item[]): void;

  adicionarNovoProduto(props: ItemProps): void;

  pegarItens(nomeFiltro?: string): Item[];

  pegarItemPeloId(id: string): Item;

  reservarItens(itens: Item[]): void;
}

export default IRepositorioEstoque;
