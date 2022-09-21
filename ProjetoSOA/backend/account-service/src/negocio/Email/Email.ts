class Email {
  private endereco: string;

  constructor(endereco: string) {
    this.endereco = endereco;
  }

  public getEndereco(): string {
    return this.endereco;
  }

  public setEndereco(endereco: string): void {
    this.endereco = endereco;
  }

  public validar(): boolean {
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return regex.test(this.endereco);
  }
}

export default Email;
