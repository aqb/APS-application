class Produto {
  [x: string]: any;
  private id;
  private nome;
  private descricao;
  private valor;

  constructor(id: string, nome: string, descricao: string, valor: number) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.valor = valor;
  }

  public getId(): string {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string) {
    this.nome = nome;
  }

  public getDescricao(): string {
    return this.descricao;
  }

  public setDescricao(descricao: string) {
    this.descricao = descricao;
  }

  public getValor(): number {
    return this.valor;
  }

  public setValor(valor: number) {
    this.valor = valor;
  }
}

export default Produto;
