import { injectable } from "tsyringe";

import Item from "../Item/Item";
import RegistroEstoque from "./RegistroEstoque";

@injectable()
class ControladorEstoque {
  private registroEstoque: RegistroEstoque;

  constructor(registroEstoque: RegistroEstoque) {
    this.registroEstoque = registroEstoque;
  }

  public async pegarItensEstoque(nomeFiltro?: string): Promise<Item[]> {
    return await this.registroEstoque.pegarItens(nomeFiltro);
  }

  public async pegarItemPeloId(id: string): Promise<Item> {
    return await this.registroEstoque.pegarItemPeloId(id);
  }

  public async removerItensEstoque(itens: Item[]): Promise<void> {
    await this.registroEstoque.removerItens(itens);
  }

  public async devolverItensAoEstoque(itens: Item[]): Promise<void> {
    await this.registroEstoque.devolverItensAoEstoque(itens);
  }
}

export default ControladorEstoque;
