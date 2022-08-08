import Cliente from "./Cliente";
import RegistroClientes from "./RegistroClientes";

class ControladorLogin {
  private registroClientes: RegistroClientes;

  constructor(registroClientes: RegistroClientes) {
    this.registroClientes = registroClientes;
  }

  public efetuarLogin(cliente: Cliente): boolean {
    return this.registroClientes.validarCredenciais(
      cliente.getEmail(),
      cliente.getSenha()
    );
  }
}

export default ControladorLogin;
