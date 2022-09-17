import { Request, Response } from "express";
import { injectable } from "tsyringe";

import CPF from "../../negocio/CPF/CPF";
import Email from "../../negocio/Email/Email";
import Fachada from "../../negocio/Fachada";
import Senha from "../../negocio/Senha/Senha";
import Usuario from "../../negocio/Usuario/Usuario";

@injectable()
class TelaCarrinhoPresenter {
  private fachada;

  constructor(fachada: Fachada) {
    this.fachada = fachada;
  }

  public criarCarrinho(req: Request, res: Response) {
    const { usuario } = req.body.usuario;

    try {
      const cliente = new Usuario(
        usuario.userId,
        new Email(usuario.email),
        new Senha(usuario.senha),
        new CPF(usuario.cpf),
        usuario.perfil
      );
      const carrinho = this.fachada.criarCarrinho(cliente);
      if (carrinho) {
        return res.json(carrinho);
      } else {
        throw new Error(
          `Não foi possível criar o carrinho para o clente ${cliente.getId()}`
        );
      }
    } catch (error) {
      throw new Error("Erro ao criar o cliente");
    }
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

  public adicionarAoCarrinho(req: Request, res: Response) {
    const { clienteId, itemId, quantidade } = req.body;
    this.fachada.adicionarAoCarrinho(clienteId, itemId, quantidade);
  }

  public async realizarPedido(req: Request, res: Response) {
    const clienteId = req.body.clienteId;
    const metodoPagamento = req.body.metodoPagamento;
    const infoPagamento = req.body.infoPagamento;

    const response = await this.fachada.realizarPedido(
      clienteId,
      metodoPagamento,
      infoPagamento
    );
    res.json(response);
  }
}

export default TelaCarrinhoPresenter;
