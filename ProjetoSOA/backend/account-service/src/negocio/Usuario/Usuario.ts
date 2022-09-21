import CPF from "../CPF/CPF";
import Email from "../Email/Email";
import Perfil from "../Perfil/Perfil";
import Senha from "../Senha/Senha";

class Usuario {
  private id;
  private email;
  private senha?;
  private cpf;
  private perfil;

  constructor(id: any, email: Email, senha: any, cpf: CPF, perfil: Perfil) {
    this.id = id;
    this.email = email;
    this.senha = senha;
    this.cpf = cpf;
    this.perfil = perfil;
  }

  public getId() {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getEmail(): Email {
    return this.email;
  }

  public setEmail(email: Email) {
    this.email = email;
  }

  public getSenha() {
    return this.senha;
  }

  public setSenha(senha?: Senha) {
    this.senha = senha;
  }

  public getCPF(): CPF {
    return this.cpf;
  }

  public setCPF(cpf: CPF) {
    this.cpf = cpf;
  }

  public getPerfil(): Perfil {
    return this.perfil;
  }

  public setPerfil(perfil: Perfil) {
    this.perfil = perfil;
  }
}

export default Usuario;
