import { injectable } from "tsyringe";

import Cliente from "../Cliente/Cliente";
import AdapterPagamentoBeeceptor from "../Pagamento/PagamentoCartao/Beeceptor/AdapterPagamentoBeeceptor";
import InfoPagamentoCartao from "../Pagamento/PagamentoCartao/InfoPagamentoCartao";
import Carrinho from "../Produto/Carrinho/Carrinho";
import RegistroCarrinhos from "../Produto/Carrinho/RegistroCarrinhos";
import Pedido from "./Pedido";
import RegistroPedidos from "./RegistroPedidos";

@injectable()
class ControladorPedido {
  private registroPedidos: RegistroPedidos;
  private registroCarrinhos: RegistroCarrinhos;

  constructor(
    registroPedidos: RegistroPedidos,
    registroCarrinhos: RegistroCarrinhos
  ) {
    this.registroPedidos = registroPedidos;
    this.registroCarrinhos = registroCarrinhos;
  }

  public criarPedido(clienteId: string): Pedido {
    const carrinho = this.registroCarrinhos.pegarCarrinhoDe(clienteId);
    // TODO: Reservar produtos no estoque.
    // this.registroEstoque.reservarProdutos(carrinho);
    return this.registroPedidos.adicionar(clienteId, carrinho);
  }

  public pegarPedidos(clienteId: string): Pedido[] {
    return this.registroPedidos.pegarPedidos(clienteId);
  }

  public async pagarCartao(
    clienteId: string,
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
        // TODO: Testar se a confirmação do pagamento e limpeza do carrinho funcionam aqui.
        this.registroPedidos.confirmarPedido(pedidoId);
        this.registroCarrinhos.limparCarrinho(clienteId);
      } catch (error: any) {
        // TODO: Devolver produtos ao estoque e cancelar pedido.
        // this.registroEstoque.devolverProdutos(carrinho);
        // this.registroPedidos.cancelarPedido(pedidoId);
        throw new Error(error.response.data.message);
      }
    } else {
      throw new Error("Bandeira do cartão inválida: " + bandeiraCartao);
    }
  }
}

export default ControladorPedido;
