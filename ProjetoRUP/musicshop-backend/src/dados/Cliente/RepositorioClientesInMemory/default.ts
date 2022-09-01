import Carrinho from "../../../negocio/Carrinho/Carrinho";
import Cliente from "../../../negocio/Cliente/Cliente";

const ClientesDefault: Cliente[] = [
  new Cliente(
    "0",
    "eric.clapton@gmail.com",
    "1234",
    "789",
    new Carrinho("0", [])
  ),
  new Cliente(
    "1",
    "renato.russo@gmail.com",
    "1234",
    "789",
    new Carrinho("1", [])
  ),
  new Cliente(
    "2",
    "reginaldo.rossi@gmail.com",
    "1234",
    "789",
    new Carrinho("2", [])
  )
];

export default ClientesDefault;
