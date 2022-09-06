import { inject, injectable } from "tsyringe";

import IRepositorioEstoque from "../../dados/Estoque/IRepositorioEstoque";
import Carrinho from "../Carrinho/Carrinho";
import ItemPedido from "../Pedido/ItemPedido";
import Produto from "../Produto/Produto";
import ItemEstoque from "./ItemEstoque";

@injectable()
class RegistroEstoque {
  private repositorioEstoque;

  constructor(
    @inject("RepositorioEstoque") repositorioEstoque: IRepositorioEstoque
  ) {
    this.repositorioEstoque = repositorioEstoque;
  }

  public adicionar(produto: Produto) {
    this.repositorioEstoque.adicionar(produto);
  }

  public pegarItensEstoque(nomeFiltro?: string): ItemEstoque[] {
    return this.repositorioEstoque.pegarItensEstoque(nomeFiltro);
  }

  public pegarItemEstoquePeloId(id: string): ItemEstoque {
    return this.repositorioEstoque.pegarItemEstoquePeloId(id);
  }

  public reservaItemEstoque(carrinho: Carrinho) {
    return this.repositorioEstoque.reservaItemEstoque(carrinho);
  }

  public devolverItensAoEstoque(itens: ItemPedido[]) {
    return this.repositorioEstoque.devolverItensAoEstoque(itens);
  }
}

export default RegistroEstoque;
