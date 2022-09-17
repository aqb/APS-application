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
    const novoUsuario = this.registroUsuarios.adicionar(camposUsuario);

    await comunicar("cart-service", {
      url: "/account",
      method: "post",
      data: {
        // Não é necessário enviar a senha do cliente, pois essa informação não é
        // relevante para o carrinho de compras, e sim para o serviço de autenticação.
        // Alem disso, a senha do cliente é uma informçao sensível, e não deve ser
        // compartilhada com outros serviços.
        usuario: new Usuario(
          novoUsuario.getId(),
          novoUsuario.getEmail(),
          undefined,
          novoUsuario.getCPF(),
          novoUsuario.getPerfil()
        )
      }
    });
  }
}

export default ControladorCadastro;
