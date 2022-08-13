import { inject, injectable } from "tsyringe";

import IRepositorioClientes from "../../dados/Cliente/IRepositorioClientes";
import Cliente from "./Cliente";

@injectable()
class RegistroClientes {
  private repositorioClientes;

  constructor(
    @inject("RepositorioClientes") repositorioClientes: IRepositorioClientes
  ) {
    this.repositorioClientes = repositorioClientes;
  }

  public adicionar(email: string, senha: string, cpf: string): Cliente {
    return this.repositorioClientes.adicionar(email, senha, cpf);
  }

  public efetuarLogin(email: string, senha: string): Cliente {
    return this.repositorioClientes.efetuarLogin(email, senha);
  }
}
export default RegistroClientes;
