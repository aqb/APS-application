import { response } from "express";
import { injectable } from "tsyringe";

import Cliente from "../Cliente/Cliente";
import AdapterPagamentoBeeceptor from "../Pagamento/AdapterPagamentoBeeceptor/AdapterPagamentoBeeceptor";
import InfoPagamentoCartao from "../Pagamento/InfoPagamentoCartao/InfoPagamentoCartao";
import Carrinho from "../Produto/Carrinho/Carrinho";
import RegistroCarrinhos from "../Produto/Carrinho/RegistroCarrinhos";
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

  private pegarCarrinho(cliente: Cliente): Carrinho {
    return this.registroCarrinhos.pegarCarrinhoDe(cliente.getId());
  }

  public criarPedido(cliente: Cliente) {
    const carrinho = this.pegarCarrinho(cliente);
    this.registroPedidos.adicionar(cliente, carrinho);
  }

  public async pagarCartao(infoPagamentoCartao: InfoPagamentoCartao) {
    const bandeiraCartao = infoPagamentoCartao.getBandeira();

    if (bandeiraCartao === "beeceptor") {
      const adapterBeecptor = new AdapterPagamentoBeeceptor();
      adapterBeecptor
        .pagarCartao(infoPagamentoCartao)
        .then(() => {
          return { pagamentoCompleto: true };
        })
        .catch(error => {
          throw new Error(error.response.data.message);
        });
    } else {
      throw new Error("Bandeira do cartão inválida: " + bandeiraCartao);
    }
  }
}

export default ControladorPedido;
