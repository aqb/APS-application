class Usuario {
  private id;
  private email;
  private senha;
  private cpf;
  private perfil;

  constructor(id: string, email: string, senha: string, cpf: string, perfil: string) {
    this.id = id;
    this.email = email;
    this.senha = senha;
    this.cpf = cpf;
    this.perfil = perfil;
  }

  public getId() {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public getSenha(): string {
    return this.senha;
  }

  public setSenha(senha: string) {
    this.senha = senha;
  }

  public getCPF(): string {
    return this.cpf;
  }

  public setCPF(cpf: string) {
    this.cpf = cpf;
  }

  public getPerfil(): string {
    return this.perfil;
  }

  public setPerfil(perfil: string) {
    this.perfil = perfil;
  }
}

export default Usuario;