import { singleton } from "tsyringe";

import Carrinho from "../../../negocio/Carrinho/Carrinho";
import IRepositorioCarrinhos from "../IRepositorioCarrinhos";
import CarrinhosDefault from "./default";

@singleton()
class RepositorioCarrinhosInMemory implements IRepositorioCarrinhos {
  private carrinhos: Carrinho[];

  constructor() {
    // TODO: Remover dados estaticos!
    this.carrinhos = CarrinhosDefault;
  }

  adicionar(clienteId: string): void {
    this.carrinhos.push(new Carrinho(clienteId, []));
  }

  pegarCarrinhoDe(clienteId: string): Carrinho {
    const carrinho = this.carrinhos.find(
      carrinho => carrinho.getId() === clienteId
    );
    if (carrinho) {
      return carrinho;
    }
    throw new Error(`Carrinho do cliente ${clienteId} não encontrado`);
  }

  atualizarCarrinho(carrinho: Carrinho): void {
    const carrinhoIndex = this.carrinhos.findIndex(
      carrinhoRegistro => carrinhoRegistro.getId() === carrinho.getId()
    );
    if (carrinhoIndex === -1) {
      throw new Error(`Carrinho ${carrinho.getId()} não encontrado`);
    }
    this.carrinhos[carrinhoIndex] = carrinho;
  }

  limparCarrinho(clienteId: string): void {
    const carrinhoIndex = this.carrinhos.findIndex(
      carrinhoRegistro => carrinhoRegistro.getId() === clienteId
    );
    if (carrinhoIndex === -1) {
      throw new Error(`Carrinho ${clienteId} não encontrado`);
    }
    this.carrinhos[carrinhoIndex].limpar();
  }
}

export default RepositorioCarrinhosInMemory;
