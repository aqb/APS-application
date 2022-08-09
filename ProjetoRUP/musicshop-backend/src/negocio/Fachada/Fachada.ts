import { injectable } from "tsyringe";

import Cliente from "../Cliente/Cliente";
import ControladorCadastro from "../Cliente/ControladorCadastro";
import ControladorLogin from "../Cliente/ControladorLogin";
import ControladorPedido from "../Pedido/ControladorPedido";
import ControladorCarrinho from "../Produtos/Carrinho/ControladorCarrinho";
import ControladorEstoque from "../Produtos/Estoque/ControladorEstoque";
import ItemEstoque from "../Produtos/Estoque/ItemEstoque";

@injectable()
class Facade {
  private controladorLogin;
  private controladorCadastro;
  private controladorEstoque;
  private controladorCarrinho;
  private controladorPedido;

  constructor(
    controladorLogin: ControladorLogin,
    controladorCadasttro: ControladorCadastro,
    controladorEstoque: ControladorEstoque,
    controladorCarrinho: ControladorCarrinho,
    controladorPedido: ControladorPedido
  ) {
    this.controladorLogin = controladorLogin;
    this.controladorCadastro = controladorCadasttro;
    this.controladorEstoque = controladorEstoque;
    this.controladorCarrinho = controladorCarrinho;
    this.controladorPedido = controladorPedido;
  }

  public efetuarCadastro(email: string, senha: string, cpf: string) {
    this.controladorCadastro.cadastrarUsuario(email, senha, cpf);
  }

  public efetuarLogin(email: string, senha: string) {
    this.controladorLogin.efetuarLogin(email, senha);
  }

  // TODO: Adicionar o parametro de usuario
  public registrarSessao() {
    this.controladorLogin.registrarSessao();
  }

  public pesquisarProdutos(nome: string): ItemEstoque[] {
    return this.controladorEstoque.pesquisarProdutos(nome);
  }

  public adicionarAoCarrinho(
    cliente: Cliente,
    item: ItemEstoque,
    quantidade: number
  ) {
    this.controladorCarrinho.atualizarCarrinho(cliente, item, quantidade);
  }

  public criarPedido(cliente: Cliente) {
    this.controladorPedido.criarPedido(cliente);
  }
}

export default Facade;
