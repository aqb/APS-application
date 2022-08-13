import { injectable } from "tsyringe";

import ItemEstoque from "./ItemEstoque";
import RegistroEstoque from "./RegistroEstoque";

@injectable()
class ControladorEstoque {
  private registroEstoque: RegistroEstoque;

  constructor(registroEstoque: RegistroEstoque) {
    this.registroEstoque = registroEstoque;
  }

  public pegarItensEstoque(nomeFiltro?: string): ItemEstoque[] {
    return this.registroEstoque.pegarItensEstoque(nomeFiltro);
  }

  public pegarItemEstoquePeloId(id: string): ItemEstoque {
    return this.registroEstoque.pegarItemEstoquePeloId(id);
  }
}

export default ControladorEstoque;
