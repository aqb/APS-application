import { container, inject, injectable, singleton } from "tsyringe";

import IRepositorioCarrinhos from "../../dados/Carrinho/IRepositorioCarrinhos";
import IRepositorioClientes from "../../dados/Cliente/IRepositorioClientes";
import IRepositorioEstoque from "../../dados/Estoque/IRepositorioEstoque";
import IRepositorioPedidos from "../../dados/Pedido/IRepositorioPedidos";
import Cliente from "../Cliente/Cliente";
import ControladorCadastro from "../Cliente/ControladorCadastro";
import ControladorLogin from "../Cliente/ControladorLogin";
import IFabricaRepositorios from "../Fabricas/IFabricaRepositorios";
import ControladorPedido from "../Pedido/ControladorPedido";
import ControladorCarrinho from "../Produtos/Carrinho/ControladorCarrinho";
import ControladorEstoque from "../Produtos/Estoque/ControladorEstoque";
import ItemEstoque from "../Produtos/Estoque/ItemEstoque";

@injectable()
@singleton()
class Facade {
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
    this.controladorCadastro.cadastrarUsuario(email, senha, cpf);
  }

  public efetuarLogin(email: string, senha: string): boolean {
    return this.controladorLogin.efetuarLogin(email, senha);
  }

  // TODO: Adicionar o parametro de usuario
  public registrarSessao() {
    this.controladorLogin.registrarSessao();
  }

  public pegarItensEstoque(nomeFiltro?: string): ItemEstoque[] {
    return this.controladorEstoque.pegarItensEstoque(nomeFiltro);
  }

  public pegarItemEstoque(id: string): ItemEstoque {
    return this.controladorEstoque.pegarItemEstoquePeloId(id);
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

  public criarPedido(cliente: Cliente) {
    this.controladorPedido.criarPedido(cliente);
  }
}

export default Facade;
