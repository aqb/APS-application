import { container, inject, injectable, singleton } from "tsyringe";

import IRepositorioEstoque from "../dados/Estoque/IRepositorioEstoque";
import { comunicar } from "../services/comunicar";
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

  public async pegarItensEstoque(nomeFiltro?: string): Promise<Item[]> {
    return await this.controladorEstoque.pegarItensEstoque(nomeFiltro);
  }

  public async pegarItemEstoque(id: string): Promise<Item> {
    return await this.controladorEstoque.pegarItemPeloId(id);
  }
}

export default Fachada;
