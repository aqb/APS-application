import { singleton } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import Email from "../../../negocio/Email/Email";
import Senha from "../../../negocio/Senha/Senha";
import Usuario from "../../../negocio/Usuario/Usuario";
import IRepositorioUsuarios from "../IRepositorioUsuarios";
import UsuariosDefault from "./default";

@singleton()
class RepositorioUsuariosInMemory implements IRepositorioUsuarios {
  private usuarios: Usuario[];

  constructor() {
    // TODO: Remover dados estaticos!
    this.usuarios = UsuariosDefault;
  }

  adicionar(camposUsuario: Usuario): Usuario {
    if (
      this.usuarios.find(
        user =>
          user.getEmail().getEmail() === camposUsuario.getEmail().getEmail()
      )
    ) {
      throw new Error("Email já cadastrado.");
    }

    if (
      this.usuarios.find(
        user => user.getCPF().getNumero() === camposUsuario.getCPF().getNumero()
      )
    ) {
      throw new Error("CPF já cadastrado.");
    }

    const id = uuidv4();
    camposUsuario.setId(id);

    this.usuarios.push(camposUsuario);
    return camposUsuario;
  }

  efetuarLogin(email: Email, senha: Senha): Usuario {
    const usuario = this.usuarios.find(
      usuario =>
        usuario.getEmail().getEmail() === email.getEmail() &&
        usuario.getSenha().getSenha() === senha.getSenha()
    );

    if (usuario) {
      return usuario;
    }
    throw new Error("Credenciais inválidas.");
  }

  editar(usuario: Usuario): Usuario {
    const usuarioIndex = this.usuarios.findIndex(
      user => user.getId() === usuario.getId()
    );

    if (usuarioIndex === -1) {
      throw new Error(`Usuário ${usuario.getId()} não encontrado.`);
    }
    this.usuarios[usuarioIndex] = usuario;
    return usuario;
  }

  pegarUsuario(id: string): Usuario {
    const usuario = this.usuarios.find(usuario => usuario.getId() === id);
    if (usuario) {
      return usuario;
    }
    throw new Error(`Usuario ${id} não encontrado.`);
  }
}

export default RepositorioUsuariosInMemory;
