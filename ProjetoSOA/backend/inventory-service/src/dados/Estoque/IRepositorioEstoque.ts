import Item from "../../negocio/Item/Item";

interface IRepositorioEstoque {
  adicionar(item: Item): void;

  adicionarItens(itens: Item[]): void;

  adicionarNovoProduto(props: Item): void;

  pegarItens(nomeFiltro?: string): Item[];

  pegarItemPeloId(id: string): Item;

  reservarItens(itens: Item[]): void;
}

export default IRepositorioEstoque;
