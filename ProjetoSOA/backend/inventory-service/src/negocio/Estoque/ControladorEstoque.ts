import { injectable } from "tsyringe";

import Item from "../Item/Item";
import RegistroEstoque from "./RegistroEstoque";

@injectable()
class ControladorEstoque {
  private registroEstoque: RegistroEstoque;

  constructor(registroEstoque: RegistroEstoque) {
    this.registroEstoque = registroEstoque;
  }

  public pegarItensEstoque(nomeFiltro?: string): Item[] {
    return this.registroEstoque.pegarItens(nomeFiltro);
  }

  public pegarItemPeloId(id: string): Item {
    return this.registroEstoque.pegarItemPeloId(id);
  }
}

export default ControladorEstoque;
