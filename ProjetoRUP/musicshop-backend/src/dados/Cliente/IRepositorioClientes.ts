import Cliente from "../../negocio/Cliente/Cliente";

interface IRepositorioClientes {
  adicionar(email: string, senha: string, cpf: string): Cliente;

  efetuarLogin(email: string, senha: string): Cliente;

  pegarCliente(id: string): Cliente;
}

export default IRepositorioClientes;
