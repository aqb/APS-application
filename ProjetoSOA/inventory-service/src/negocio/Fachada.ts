import { container, inject, injectable, singleton } from "tsyringe";

import IRepositorioEstoque from "../dados/Estoque/IRepositorioEstoque";
import ControladorEstoque from "./Estoque/ControladorEstoque";
import IFabricaRepositorios from "./IFabricaRepositorios";
import Item from "./Item/Item";

@injectable()
@singleton()
class Fachada {
  private controladorEstoque;

  constructor(
    @inject("FabricaRepositorios") fabricaRepositorios: IFabricaRepositorios
  ) {
    container.register<IRepositorioEstoque>("RepositorioEstoque", {
      useValue: fabricaRepositorios.criarRepositorioEstoque()
    });

    this.controladorEstoque = container.resolve(ControladorEstoque);
  }

  public pegarItensEstoque(nomeFiltro?: string): Item[] {
    return this.controladorEstoque.pegarItensEstoque(nomeFiltro);
  }

  public pegarItemEstoque(id: string): Item {
    return this.controladorEstoque.pegarItemPeloId(id);
  }

  public adicionarAoCarrinho(
    clienteId: string,
    produtoId: string,
    quantidadeDesejada: number
  ) {
    // TODO: Implementar comunicação com o serviço de carrinho.
  }
}

export default Fachada;
