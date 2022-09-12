import Pedido from "../../Pedido/Pedido";
import Pagamento from "../Pagamento";

class PagamentoCartao extends Pagamento {
  protected numeroCartao;
  protected cvvCartao;
  protected vencimento;
  protected nomeTitular;
  protected cpfTitular;
  protected valorPagamento;
  private bandeira;

  public constructor(pedido: Pedido, infoPagamento: any) {
    super(pedido);
    try {
      this.numeroCartao = infoPagamento.numeroCartao;
      this.cvvCartao = infoPagamento.cvvCartao;
      this.vencimento = infoPagamento.vencimento;
      this.nomeTitular = infoPagamento.nomeTitular;
      this.cpfTitular = infoPagamento.cpfTitular;
      this.bandeira = infoPagamento.bandeira;
      this.valorPagamento = infoPagamento.valorPagamento;
    } catch (error) {
      throw new Error(`Erro ao criar pagamento com cartão. ${error}`);
    }
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

  public getValorPagamento(): number {
    return this.valorPagamento;
  }

  public setValorPagamento(valorPagamento: number) {
    this.valorPagamento = valorPagamento;
  }

  public async pagar(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default PagamentoCartao;
