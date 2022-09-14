import { inject, injectable } from "tsyringe";

import IRepositorioEstoque from "../../dados/Estoque/IRepositorioEstoque";
import Item from "../Item/Item";

@injectable()
class RegistroEstoque {
  private repositorioEstoque;

  constructor(
    @inject("RepositorioEstoque") repositorioEstoque: IRepositorioEstoque
  ) {
    this.repositorioEstoque = repositorioEstoque;
  }

  public adicionar(item: Item) {
    this.repositorioEstoque.adicionar(item);
  }

  public pegarItens(nomeFiltro?: string): Item[] {
    return this.repositorioEstoque.pegarItens(nomeFiltro);
  }

  public pegarItemPeloId(id: string): Item {
    return this.repositorioEstoque.pegarItemPeloId(id);
  }

  public reservarItens(itens: Item[]) {
    return this.repositorioEstoque.reservarItens(itens);
  }

  public devolverItensAoEstoque(itens: Item[]) {
    return this.repositorioEstoque.adicionarItens(itens);
  }
}

export default RegistroEstoque;
