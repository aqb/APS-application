class ItemPedido {
  private produtoId;
  private valor;
  private quantidade;

  public constructor(produtoId: string, valor: number, quantidade: number) {
    this.produtoId = produtoId;
    this.valor = valor;
    this.quantidade = quantidade;
  }

  public getProdutoId(): string {
    return this.produtoId;
  }

  public setProdutoId(produtoId: string) {
    this.produtoId = produtoId;
  }

  public getValor(): number {
    return this.valor;
  }

  public setValor(valor: number) {
    this.valor = valor;
  }

  public getQuantidade(): number {
    return this.quantidade;
  }

  public setQuantidade(quantidade: number) {
    this.quantidade = quantidade;
  }
}

export default ItemPedido;
