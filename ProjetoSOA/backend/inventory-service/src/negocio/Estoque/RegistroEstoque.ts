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

  public async adicionar(item: Item) {
    this.repositorioEstoque.adicionar(item);
  }

  public async pegarItens(nomeFiltro?: string): Promise<Item[]> {
    return this.repositorioEstoque.pegarItens(nomeFiltro);
  }

  public async pegarItemPeloId(id: string): Promise<Item> {
    return this.repositorioEstoque.pegarItemPeloId(id);
  }

  public async removerItens(itens: Item[]) {
    await this.repositorioEstoque.removerItens(itens);
  }

  public async devolverItensAoEstoque(itens: Item[]) {
    return await this.repositorioEstoque.adicionarItens(itens);
  }
}

export default RegistroEstoque;
