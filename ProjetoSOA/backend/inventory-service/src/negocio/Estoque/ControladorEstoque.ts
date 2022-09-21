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
}

export default ControladorEstoque;
