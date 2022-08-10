interface IRepositorioClientes {
  adicionar(email: string, senha: string, cpf: string): void;

  validarCredenciais(email: string, senha: string): boolean;
}

export default IRepositorioClientes;
