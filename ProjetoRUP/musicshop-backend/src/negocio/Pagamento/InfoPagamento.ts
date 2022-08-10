class InfoPagamento {
  private metodo;

  public constructor(metodo: string) {
    this.metodo = metodo;
  }

  public getMetodo(): string {
    return this.metodo;
  }

  public setMetodo(metodo: string) {
    this.metodo = metodo;
  }
}

export default InfoPagamento;
