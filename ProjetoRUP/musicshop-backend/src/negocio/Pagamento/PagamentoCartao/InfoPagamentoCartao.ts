class InfoPagamentoCartao {
  private numeroCartao;
  private cvvCartao;
  private vencimento;
  private nomeTitular;
  private cpfTitular;
  private bandeira;

  public constructor(
    numeroCartao: string,
    cvvCartao: string,
    vencimento: Date,
    nomeTitular: string,
    cpfTitular: string,
    bandeira: string
  ) {
    this.numeroCartao = numeroCartao;
    this.cvvCartao = cvvCartao;
    this.vencimento = vencimento;
    this.nomeTitular = nomeTitular;
    this.cpfTitular = cpfTitular;
    this.bandeira = bandeira;
  }

  public getNumeroCartao(): string {
    return this.numeroCartao;
  }

  public setNumeroCartao(numeroCartao: string) {
    this.numeroCartao = numeroCartao;
  }

  public getCvvCartao(): string {
    return this.cvvCartao;
  }

  public setCvvCartao(cvvCartao: string) {
    this.cvvCartao = cvvCartao;
  }

  public getVencimento(): Date {
    return this.vencimento;
  }

  public setVencimento(vencimento: Date) {
    this.vencimento = vencimento;
  }

  public getNomeTitular(): string {
    return this.nomeTitular;
  }

  public setNomeTitular(nome: string) {
    this.nomeTitular = nome;
  }

  public getCPFTitular(): string {
    return this.cpfTitular;
  }

  public setCPFTitular(cpf: string) {
    this.cpfTitular = cpf;
  }

  public getBandeira(): string {
    return this.bandeira;
  }

  public setBandeira(bandeira: string) {
    this.bandeira = bandeira;
  }
}

export default InfoPagamentoCartao;
