import { container, inject, injectable, singleton } from "tsyringe";

import IRepositorioCarrinhos from "../dados/Carrinho/IRepositorioCarrinhos";
import IRepositorioClientes from "../dados/Cliente/IRepositorioClientes";
import IRepositorioEstoque from "../dados/Estoque/IRepositorioEstoque";
import IRepositorioPedidos from "../dados/Pedido/IRepositorioPedidos";
import Carrinho from "./Carrinho/Carrinho";
import ControladorCarrinho from "./Carrinho/ControladorCarrinho";
import Cliente from "./Cliente/Cliente";
import ControladorCadastro from "./Cliente/ControladorCadastro";
import ControladorLogin from "./Cliente/ControladorLogin";
import ControladorEstoque from "./Estoque/ControladorEstoque";
import IFabricaRepositorios from "./IFabricaRepositorios";
import Item from "./Item/Item";
import ControladorPedido from "./Pedido/ControladorPedido";
import Pedido from "./Pedido/Pedido";

@injectable()
@singleton()
class Fachada {
  private controladorLogin;
  private controladorCadastro;
  private controladorEstoque;
  private controladorCarrinho;
  private controladorPedido;

  constructor(
    @inject("FabricaRepositorios") fabricaRepositorios: IFabricaRepositorios
  ) {
    container.register<IRepositorioClientes>("RepositorioClientes", {
      useValue: fabricaRepositorios.criarRepositorioClientes()
    });
    container.register<IRepositorioCarrinhos>("RepositorioCarrinhos", {
      useValue: fabricaRepositorios.criarRepositorioCarrinhos()
    });
    container.register<IRepositorioEstoque>("RepositorioEstoque", {
      useValue: fabricaRepositorios.criarRepositorioEstoque()
    });
    container.register<IRepositorioPedidos>("RepositorioPedidos", {
      useValue: fabricaRepositorios.criarRepositorioPedidos()
    });

    this.controladorLogin = container.resolve(ControladorLogin);
    this.controladorCadastro = container.resolve(ControladorCadastro);
    this.controladorEstoque = container.resolve(ControladorEstoque);
    this.controladorCarrinho = container.resolve(ControladorCarrinho);
    this.controladorPedido = container.resolve(ControladorPedido);
  }

  public efetuarCadastro(email: string, senha: string, cpf: string) {
    this.controladorCadastro.efetuarCadastro(email, senha, cpf);
  }

  public efetuarLogin(email: string, senha: string): Cliente {
    return this.controladorLogin.efetuarLogin(email, senha);
  }

  public registrarSessao(cliente: Cliente): string {
    return this.controladorLogin.registrarSessao(cliente);
  }

  public pegarItensEstoque(nomeFiltro?: string): Item[] {
    return this.controladorEstoque.pegarItensEstoque(nomeFiltro);
  }

  public pegarItemEstoque(id: string): Item {
    return this.controladorEstoque.pegarItemPeloId(id);
  }

  public pegarCarrinho(clienteId: string): Carrinho {
    return this.controladorCarrinho.pegarCarrinhoDe(clienteId);
  }

  public adicionarAoCarrinho(
    clienteId: string,
    produtoId: string,
    quantidadeDesejada: number
  ) {
    this.controladorCarrinho.atualizarCarrinho(
      clienteId,
      produtoId,
      quantidadeDesejada
    );
  }

  public async realizarPedido(
    clienteId: string,
    metodoPagamento: string,
    infoPagamento: any
  ): Promise<Pedido> {
    const pedido = await this.controladorPedido.realizarPedido(
      clienteId,
      metodoPagamento,
      infoPagamento
    );

    return pedido;
  }

  public pegarPedidos(clienteId: string): Pedido[] {
    return this.controladorPedido.pegarPedidos(clienteId);
  }

  public pegarPedido(pedidoId: string): Pedido {
    return this.controladorPedido.pegarPedido(pedidoId);
  }
}

export default Fachada;
