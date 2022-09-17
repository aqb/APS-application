import { singleton } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import Carrinho from "../../../negocio/Carrinho/Carrinho";
import Cliente from "../../../negocio/Usuario/Usuario";
import IRepositorioCarrinhos from "../IRepositorioCarrinhos";
import CarrinhosDefault from "./default";

@singleton()
class RepositorioCarrinhosInMemory implements IRepositorioCarrinhos {
  private carrinhos: Carrinho[];

  constructor() {
    // TODO: Remover dados estaticos!
    this.carrinhos = CarrinhosDefault;
  }

  adicionar(cliente: Cliente): Carrinho {
    const id = uuidv4();
    const carrinho = new Carrinho(id, cliente, []);
    this.carrinhos.push(carrinho);
    return carrinho;
  }

  pegarCarrinhoDe(clienteId: string): Carrinho {
    const carrinho = this.carrinhos.find(
      carrinho => carrinho.getCliente().getId() === clienteId
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

  limparCarrinho(carrinho: Carrinho): void {
    const carrinhoIndex = this.carrinhos.findIndex(
      carrinhoRegistro => carrinhoRegistro.getId() === carrinho.getId()
    );
    if (carrinhoIndex === -1) {
      throw new Error(`Carrinho ${carrinho.getId()} não encontrado`);
    }
    this.carrinhos[carrinhoIndex].limpar();
  }
}

export default RepositorioCarrinhosInMemory;
