import { injectable } from "tsyringe";

import { comunicar } from "../../services/comunicar";
import Carrinho from "../Carrinho/Carrinho";
import CPF from "../CPF/CPF";
import Email from "../Email/Email";
import Item from "../Item/Item";
import ItemPedido from "../Item/ItemPedido";
import FabricaPagamento from "../Pagamento/FabricaPagamento";
import FabricaPagamentoCartao from "../Pagamento/PagamentoCartao/FabricaPagamentoCartao";
import Produto from "../Produto/Produto";
import Senha from "../Senha/Senha";
import Usuario from "../Usuario/Usuario";
import Pedido from "./Pedido";
import RegistroPedidos from "./RegistroPedidos";

@injectable()
class ControladorPedido {
  private registroPedidos: RegistroPedidos;

  constructor(registroPedidos: RegistroPedidos) {
    this.registroPedidos = registroPedidos;
  }

  public async realizarPedido(
    authHeader: string,
    carrinhoId: string,
    metodoPagamento: string,
    infoPagamentoJSON: any
  ): Promise<Pedido> {
    // Buscar Carrinho no Serviço Carrinho.
    const cartResponse = await comunicar("cart-service", {
      url: "/carrinho/" + carrinhoId,
      method: "get",
      headers: {
        authorization: authHeader
      }
    });

    const cartData = cartResponse.data;
    const cliente = new Usuario(
      cartData.cliente.id,
      new Email(cartData.cliente.email.endereco),
      new Senha(cartData.cliente.senha.senha),
      new CPF(cartData.cliente.cpf.numero),
      cartData.cliente.perfil
    );
    const itens = cartData.itens.map((item: any) => {
      const produto = new Produto(
        item.produto.id,
        item.produto.nome,
        item.produto.descricao,
        item.produto.valor
      );
      return new Item(produto, item.quantidade);
    });
    const carrinho = new Carrinho(cartData.id, cliente, itens);

    // Verificação das Informações Pagamento.
    const metodoPagamentoMap: { [key: string]: FabricaPagamento } = {
      cartao: new FabricaPagamentoCartao()
    };
    const fabricaPagamento = metodoPagamentoMap[metodoPagamento];
    if (!fabricaPagamento) {
      throw new Error(`Método de pagamento ${metodoPagamento} não suportado.`);
    }

    if (carrinho.isEmpty()) {
      throw new Error(
        "Seu carrinho vazio! Adicione produtos antes de criar o seu pedido."
      );
    }

    console.log("Reservando itens");
    // Reservar Produtos no Serviço Estoque.
    await comunicar("inventory-service", {
      url: "/reservar",
      method: "patch",
      data: {
        itens: carrinho.getItens()
      }
    });

    console.log("Pegando itens pedido");

    // Criação do Pedido.
    const itensPedido = carrinho.getItens().map(item => {
      const produto = item.getProduto();
      const quantidade = item.getQuantidade();
      return new ItemPedido(produto, quantidade, produto.getValor());
    });
    const pedido = this.registroPedidos.adicionar(cliente, itensPedido);

    // Pagamento.
    try {
      const pagamento = fabricaPagamento.criarPagamento(
        pedido,
        infoPagamentoJSON
      );

      await pagamento.pagar();

      // Limpa o carrinho no Serviço Carrinho.
      await comunicar("cart-service", {
        url: "/limpar/" + carrinhoId,
        method: "patch",
        headers: {
          authorization: authHeader
        }
      });

      return pedido;
    } catch (error) {
      // Cancela o Pedido.
      this.registroPedidos.cancelarPedido(pedido.getId());

      // Devolver Produtos ao Serviço Estoque.
      await comunicar("inventory-service", {
        url: "/devolver",
        method: "patch",
        data: {
          itens: carrinho.getItens()
        }
      });

      throw error;
    }
  }

  public async pegarPedidos(clienteId: string): Promise<Pedido[]> {
    return await this.registroPedidos.pegarPedidos(clienteId);
  }

  public async pegarPedido(pedidoId: string): Promise<Pedido> {
    return await this.registroPedidos.pegarPedido(pedidoId);
  }
}

export default ControladorPedido;
