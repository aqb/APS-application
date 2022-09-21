class Senha {
  private senha: string;

  constructor(senha: string) {
    this.senha = senha;
  }

  public getSenha(): string {
    return this.senha;
  }

  public validar(): boolean {
    return this.senha.length >= 8;
  }
}

export default Senha;
