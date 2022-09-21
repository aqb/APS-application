import { v4 as uuidv4 } from "uuid";

import CPF from "../../../negocio/CPF/CPF";
import Email from "../../../negocio/Email/Email";
import ItemPedido from "../../../negocio/Item/ItemPedido";
import Pedido from "../../../negocio/Pedido/Pedido";
import PedidoStatus from "../../../negocio/Pedido/PedidoStatus";
import Perfil from "../../../negocio/Perfil/Perfil";
import Produto from "../../../negocio/Produto/Produto";
import Senha from "../../../negocio/Senha/Senha";
import Usuario from "../../../negocio/Usuario/Usuario";

const ClientesDefaults: Usuario[] = [
  new Usuario(
    "1",
    new Email("eric.clapton@gmail.com"),
    new Senha("12345678"),
    new CPF("123.456.789-00"),
    Perfil.CLIENTE
  ),
  new Usuario(
    "2",
    new Email("renato.russo@gmail.com"),
    new Senha("12345678"),
    new CPF("123.456.789-11"),
    Perfil.CLIENTE
  )
];

const PedidosDefault = ClientesDefaults.map(cliente => {
  const id = uuidv4();
  return new Pedido(
    id,
    cliente,
    [
      new ItemPedido(
        new Produto("1", "Guitarra", "Guitarra de rock", 100),
        13,
        150
      )
    ],
    PedidoStatus.PENDENTE
  );
});

export default PedidosDefault;
