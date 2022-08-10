import { injectable } from "tsyringe";

import ItemEstoque from "./ItemEstoque";
import RegistroEstoque from "./RegistroEstoque";

@injectable()
class ControladorEstoque {
  private registroEstoque: RegistroEstoque;

  constructor(registroEstoque: RegistroEstoque) {
    this.registroEstoque = registroEstoque;
  }

  public pesquisarProdutos(nome: string): ItemEstoque[] {
    return this.registroEstoque.getItensComNome(nome);
  }

  public pegarItemEstoquePeloId(id: string): ItemEstoque {
    return this.registroEstoque.pegarItemEstoquePeloId(id);
  }
}

export default ControladorEstoque;
