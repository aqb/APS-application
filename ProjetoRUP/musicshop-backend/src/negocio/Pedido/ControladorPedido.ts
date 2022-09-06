import { injectable } from "tsyringe";

import ItemCarrinho from "../Carrinho/ItemCarrinho";
import RegistroCarrinhos from "../Carrinho/RegistroCarrinhos";
import RegistroEstoque from "../Estoque/RegistroEstoque";
import FabricaPagamento from "../Pagamento/FabricaPagamento";
import Pagamento from "../Pagamento/Pagamento";
import FabricaPagamentoCartao from "../Pagamento/PagamentoCartao/FabricaPagamentoCartao";
import ItemPedido from "./ItemPedido";
import Pedido from "./Pedido";
import RegistroPedidos from "./RegistroPedidos";

@injectable()
class ControladorPedido {
  private registroPedidos: RegistroPedidos;
  private registroCarrinhos: RegistroCarrinhos;
  private registroEstoque: RegistroEstoque;

  constructor(
    registroPedidos: RegistroPedidos,
    registroCarrinhos: RegistroCarrinhos,
    registroEstoque: RegistroEstoque
  ) {
    this.registroPedidos = registroPedidos;
    this.registroCarrinhos = registroCarrinhos;
    this.registroEstoque = registroEstoque;
  }

  public criarPedido(clienteId: string): Pedido {
    const carrinho = this.registroCarrinhos.pegarCarrinhoDe(clienteId);
    if (carrinho.getItens().length === 0) {
      throw new Error(
        "Seu carrinho vazio! Adicione produtos antes de criar o seu pedido."
      );
    }

    this.registroEstoque.reservaItemEstoque(carrinho);

    const itensPedido = carrinho
      .getItens()
      .map((item: ItemCarrinho): ItemPedido => {
        return new ItemPedido(
          item.getId(),
          item.getProduto().getValor(),
          item.getQuantidade()
        );
      });
    return this.registroPedidos.adicionar(clienteId, itensPedido);
  }

  public pegarPedidos(clienteId: string): Pedido[] {
    return this.registroPedidos.pegarPedidos(clienteId);
  }

  public pegarPedido(pedidoId: string): Pedido {
    return this.registroPedidos.pegarPedido(pedidoId);
  }

  public async pagar(
    clienteId: string,
    pedidoId: string,
    metodo: string,
    infoPagamentoJSON: any
  ) {
    const pedido = this.registroPedidos.pegarPedido(pedidoId);
    if (!pedido) {
      throw new Error("Pedido não encontrado para pagamento.");
    }

    const metodoPagamentoMap: { [key: string]: FabricaPagamento } = {
      cartao: new FabricaPagamentoCartao()
    };
    const fabricaPagamento = metodoPagamentoMap[metodo];
    if (!fabricaPagamento) {
      throw new Error(`Método de pagamento ${metodo} não suportado.`);
    }
    try {
      const pagamento = fabricaPagamento.criarPagamento(clienteId, pedidoId, infoPagamentoJSON);
      pagamento.pagar();
      this.registroCarrinhos.limparCarrinho(clienteId);
    } catch (error) {
      this.registroEstoque.devolverItensAoEstoque(pedido.getItens())
      throw error
    }
    
  }
}

export default ControladorPedido;
