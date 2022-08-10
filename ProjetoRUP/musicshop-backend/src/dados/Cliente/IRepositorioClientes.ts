import Cliente from "../../negocio/Cliente/Cliente";

interface IRepositorioClientes {
  adicionar(email: string, senha: string, cpf: string): Cliente;

  validarCredenciais(email: string, senha: string): boolean;
}

export default IRepositorioClientes;
