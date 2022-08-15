import { injectable } from "tsyringe";

import Cliente from "../Cliente/Cliente";
import AdapterPagamentoBeeceptor from "../Pagamento/PagamentoCartao/Beeceptor/AdapterPagamentoBeeceptor";
import InfoPagamentoCartao from "../Pagamento/PagamentoCartao/InfoPagamentoCartao";
import Carrinho from "../Produto/Carrinho/Carrinho";
import RegistroCarrinhos from "../Produto/Carrinho/RegistroCarrinhos";
import RegistroEstoque from "../Produto/Estoque/RegistroEstoque";
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
    this.registroEstoque.reservaItemEstoque(carrinho);
    return this.registroPedidos.adicionar(clienteId, carrinho);
  }

  public pegarPedidos(clienteId: string): Pedido[] {
    return this.registroPedidos.pegarPedidos(clienteId);
  }

  public async pagarCartao(
    pedidoId: string,
    infoPagamentoCartao: InfoPagamentoCartao
  ) {
    const bandeiraCartao = infoPagamentoCartao.getBandeira();
    const pedido = this.registroPedidos.pegarPedido(pedidoId);

    if (!pedido) {
      throw new Error("Pedido não encontrado");
    }

    if (bandeiraCartao === "beeceptor") {
      const adapterBeeceptor = new AdapterPagamentoBeeceptor();
      try {
        await adapterBeeceptor.pagarCartao(infoPagamentoCartao);
      } catch (error: any) {
        throw new Error(error.response.data.message);
      }
    } else {
      throw new Error("Bandeira do cartão inválida: " + bandeiraCartao);
    }
  }

  public confirmarPagamento(pedidoId: string) {
    this.registroPedidos.confirmarPedido(pedidoId);
  }

  public limparCarrinho(clienteId: string) {
    this.registroCarrinhos.limparCarrinho(clienteId);
  }
}

export default ControladorPedido;
