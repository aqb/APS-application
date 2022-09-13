import { singleton } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

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

  adicionar(
    email: string,
    senha: string,
    cpf: string,
    perfil: string
  ): Usuario {
    if (this.usuarios.find(user => user.getEmail() === email)) {
      throw new Error("Email já cadastrado.");
    }

    if (this.usuarios.find(user => user.getCPF() === cpf)) {
      throw new Error("CPF já cadastrado.");
    }

    const id = uuidv4();
    const novoUsuario = new Usuario(id, email, senha, cpf, perfil);

    this.usuarios.push(novoUsuario);
    return novoUsuario;
  }

  efetuarLogin(email: string, senha: string): Usuario {
    const usuario = this.usuarios.find(
      usuario => usuario.getEmail() === email && usuario.getSenha() === senha
    );

    if (usuario) {
      return usuario;
    }
    throw new Error("Credenciais inválidas.");
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
