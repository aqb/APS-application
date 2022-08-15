import { injectable } from "tsyringe";

import AdapterPagamentoBeeceptor from "../Pagamento/PagamentoCartao/Beeceptor/AdapterPagamentoBeeceptor";
import InfoPagamentoCartao from "../Pagamento/PagamentoCartao/InfoPagamentoCartao";
import RegistroCarrinhos from "../Produto/Carrinho/RegistroCarrinhos";
import ItemEstoque from "../Produto/Estoque/ItemEstoque";
import RegistroEstoque from "../Produto/Estoque/RegistroEstoque";
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
    this.registroEstoque.reservaItemEstoque(carrinho);
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
        await adapterBeeceptor.pagarCartao(pedido.getId(), infoPagamentoCartao);
        this.registroPedidos.confirmarPedido(pedidoId);
        this.registroCarrinhos.limparCarrinho(clienteId);
      } catch (error: any) {
        this.registroPedidos.cancelarPedido(pedidoId);

        const itensParaDevolver = pedido.getItens().map((item: ItemPedido) => {
          return {
            produtoId: item.getProdutoId(),
            quantidade: item.getQuantidade()
          };
        });
        this.registroEstoque.devolverItensAoEstoque(itensParaDevolver);

        throw new Error(error.response.data.message);
      }
    } else {
      throw new Error("Bandeira do cartão inválida: " + bandeiraCartao);
    }
  }
}

export default ControladorPedido;
