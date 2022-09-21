class CPF {
  private numero: string;

  constructor(numero: string) {
    this.numero = numero;
  }

  public getNumero(): string {
    return this.numero;
  }

  public setNumero(numero: string): void {
    this.numero = numero;
  }

  public validar(): boolean {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(this.numero);
  }
}

export default CPF;
