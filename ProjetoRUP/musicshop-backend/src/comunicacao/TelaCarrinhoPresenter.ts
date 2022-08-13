import { Request, Response } from "express";
import { injectable } from "tsyringe";

import Fachada from "../negocio/Fachada/Fachada";
import InfoPagamentoCartao from "../negocio/Pagamento/InfoPagamentoCartao/InfoPagamentoCartao";

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
    this.fachada.criarPedido(req.body.cliente);
    res.status(201).send();
  }

  public async pagar(req: Request, res: Response) {
    const metodoPagamento = req.body.metodoPagamento;
    if (metodoPagamento === "cartao") {
      const infoPagamentoJson = req.body.infoPagamentoCartao;
      const infoPagamentoObj = new InfoPagamentoCartao(
        infoPagamentoJson.numeroCartao,
        infoPagamentoJson.cvvCartao,
        infoPagamentoJson.vencimento,
        infoPagamentoJson.nomeTitular,
        infoPagamentoJson.cpfTitular,
        infoPagamentoJson.bandeira
      );
      this.fachada.pagarCartao(infoPagamentoObj);
      res.status(201).send();
    } else {
      throw new Error("Método de pagamento inválido");
    }
  }
}

export default TelaCarrinhoPresenter;
