import { singleton } from "tsyringe";

import Carrinho from "../../../negocio/Produto/Carrinho/Carrinho";
import ItemCarrinho from "../../../negocio/Produto/Carrinho/ItemCarrinho";
import Produto from "../../../negocio/Produto/Produto";
import IRepositorioCarrinhos from "../IRepositorioCarrinhos";

// TODO: Remover dados estaticos!
const defaultCarrinhos: Carrinho[] = [
  new Carrinho("0", [
    new ItemCarrinho(
      new Produto("3", "Cavaquinho", "Cavaquinho de pagode", 130),
      10
    )
  ]),
  new Carrinho("1", [
    new ItemCarrinho(new Produto("1", "Guitarra", "Guitarra de rock", 100), 2)
  ]),
  new Carrinho("2", [
    new ItemCarrinho(new Produto("2", "Bateria", "Bateria Verde", 13000), 1)
  ])
];

@singleton()
class RepositorioCarrinhosInMemory implements IRepositorioCarrinhos {
  private carrinhos: Carrinho[];

  constructor() {
    // TODO: Remover dados estaticos!
    this.carrinhos = defaultCarrinhos;
  }

  adicionar(carrinho: Carrinho): void {
    this.carrinhos.push(carrinho);
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
}

export default RepositorioCarrinhosInMemory;
