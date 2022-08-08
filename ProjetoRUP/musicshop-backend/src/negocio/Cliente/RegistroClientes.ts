import IRepositorioClientes from "../../dados/IRepositorioClientes";
import Cliente from "./Cliente";

class RegistroClientes {
  private repositorioClientes;

  constructor(repositorioClientes: IRepositorioClientes) {
    this.repositorioClientes = repositorioClientes;
  }

  public adicionar(email: string, senha: string, cpf: string) {
    this.repositorioClientes.adicionar(email, senha, cpf);
  }

  public validarCredenciais(email: string, senha: string): boolean {
    return this.repositorioClientes.validarCredenciais(email, senha);
  }
}
export default RegistroClientes;
