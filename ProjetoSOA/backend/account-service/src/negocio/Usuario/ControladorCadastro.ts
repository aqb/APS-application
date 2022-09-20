import { injectable } from "tsyringe";

import { comunicar } from "../../services/comunicar";
import RegistroUsuarios from "./RegistroUsuarios";
import Usuario from "./Usuario";

@injectable()
class ControladorCadastro {
  private registroUsuarios;

  constructor(registroUsuarios: RegistroUsuarios) {
    this.registroUsuarios = registroUsuarios;
  }

  public async efetuarCadastro(camposUsuario: Usuario) {
    const novoUsuario = await this.registroUsuarios.adicionar(camposUsuario);

    const usuarioCarrinho = new Usuario(
      novoUsuario.getId(),
      novoUsuario.getEmail(),
      undefined,
      novoUsuario.getCPF(),
      novoUsuario.getPerfil()
    );
    await comunicar("cart-service", {
      url: "/carrinho",
      method: "post",
      data: {
        // Não é necessário enviar a senha do cliente, pois essa informação não é
        // relevante para o carrinho de compras, e sim para o serviço de autenticação.
        // Alem disso, a senha do cliente é uma informaçao sensível, e não deve ser
        // compartilhada com outros serviços.
        usuario: usuarioCarrinho
      }
    });
  }
}

export default ControladorCadastro;
