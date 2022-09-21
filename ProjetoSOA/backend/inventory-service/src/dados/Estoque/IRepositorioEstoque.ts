import Item from "../../negocio/Item/Item";

interface IRepositorioEstoque {
  adicionar(item: Item): Promise<void>;

  adicionarItens(itens: Item[]): Promise<void>;

  adicionarNovoProduto(props: Item): Promise<void>;

  pegarItens(nomeFiltro?: string): Promise<Item[]>;

  pegarItemPeloId(id: string): Promise<Item>;

  removerItens(itens: Item[]): Promise<void>;
}

export default IRepositorioEstoque;
