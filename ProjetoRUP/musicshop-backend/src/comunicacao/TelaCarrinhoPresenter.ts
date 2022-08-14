import { Request, Response } from "express";
import { injectable } from "tsyringe";

import Fachada from "../negocio/Fachada/Fachada";
import InfoPagamentoCartao from "../negocio/Pagamento/PagamentoCartao/InfoPagamentoCartao";

@injectable()
class TelaCarrinhoPresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  public pegarCarrinho(req: Request, res: Response) {
    const clienteId = req.body.clienteId;
    const carrinho = this.fachada.pegarCarrinho(clienteId);
    if (carrinho) {
      res.json(carrinho);
    } else {
      throw new Error(
        "Não foi possível encontrar o carrinho do cliente " + clienteId
      );
    }
  }

  public criarPedido(req: Request, res: Response) {
    const clienteId = req.body.clienteId;
    const pedido = this.fachada.criarPedido(clienteId);
    if (pedido) {
      res.json(pedido);
    } else {
      throw new Error("Não foi possível criar o pedido.");
    }
  }

  public async finalizarPedido(req: Request, res: Response) {
    const metodoPagamento = req.body.metodoPagamento;
    const pedidoId = req.body.pedidoId;
    const clienteId = req.body.clienteId;
    if (metodoPagamento === "cartao") {
      const infoPagamentoJson = req.body.infoPagamentoCartao;
      const infoPagamento = new InfoPagamentoCartao(
        infoPagamentoJson.numeroCartao,
        infoPagamentoJson.cvvCartao,
        infoPagamentoJson.vencimento,
        infoPagamentoJson.nomeTitular,
        infoPagamentoJson.cpfTitular,
        infoPagamentoJson.bandeira
      );
      await this.fachada.pagarCartao(clienteId, pedidoId, infoPagamento);
      res.send();
    } else {
      throw new Error(`Método de pagamento ${metodoPagamento} inválido.`);
    }
  }
}

export default TelaCarrinhoPresenter;
