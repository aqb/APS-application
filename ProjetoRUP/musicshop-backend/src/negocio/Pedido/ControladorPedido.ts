import { injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import RegistroCarrinhos from "../Carrinho/RegistroCarrinhos";
import RegistroEstoque from "../Estoque/RegistroEstoque";
import ItemPedido from "../Item/ItemPedido";
import FabricaPagamento from "../Pagamento/FabricaPagamento";
import FabricaPagamentoCartao from "../Pagamento/PagamentoCartao/FabricaPagamentoCartao";
import Pedido from "./Pedido";
import PedidoStatus from "./PedidoStatus";
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

  public async realizarPedido(
    clienteId: string,
    metodoPagamento: string,
    infoPagamentoJSON: any
  ): Promise<Pedido> {
    // Verificação das Informações Pagamento.
    const metodoPagamentoMap: { [key: string]: FabricaPagamento } = {
      cartao: new FabricaPagamentoCartao()
    };
    const fabricaPagamento = metodoPagamentoMap[metodoPagamento];
    if (!fabricaPagamento) {
      throw new Error(`Método de pagamento ${metodoPagamento} não suportado.`);
    }

    // Verificação do Carrinho.
    const carrinho = this.registroCarrinhos.pegarCarrinhoDe(clienteId);
    if (carrinho.isEmpty()) {
      throw new Error(
        "Seu carrinho vazio! Adicione produtos antes de criar o seu pedido."
      );
    }
    this.registroEstoque.reservarItens(carrinho.getItens());

    // Criação do Pedido.
    const pedidoId = uuidv4();
    const itensPedido = carrinho.getItens().map(item => {
      const produto = item.getProduto();
      const quantidade = item.getQuantidade();
      return new ItemPedido(produto, quantidade, produto.getValor());
    });
    const pedido = new Pedido(
      pedidoId,
      clienteId,
      itensPedido,
      PedidoStatus.PENDENTE
    );

    // Pagamento.
    try {
      const pagamento = fabricaPagamento.criarPagamento(
        clienteId,
        pedidoId,
        infoPagamentoJSON
      );
      await pagamento.pagar();
      this.registroPedidos.adicionar(pedido);
      this.registroCarrinhos.limparCarrinho(clienteId);
      return pedido;
    } catch (error) {
      this.registroEstoque.devolverItensAoEstoque(carrinho.getItens());
      throw error;
    }
  }

  public pegarPedidos(clienteId: string): Pedido[] {
    return this.registroPedidos.pegarPedidos(clienteId);
  }

  public pegarPedido(pedidoId: string): Pedido {
    return this.registroPedidos.pegarPedido(pedidoId);
  }
}

export default ControladorPedido;
