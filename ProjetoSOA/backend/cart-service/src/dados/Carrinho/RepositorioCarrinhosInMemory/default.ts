import { v4 as uuidv4 } from "uuid";

import Carrinho from "../../../negocio/Carrinho/Carrinho";
import CPF from "../../../negocio/CPF/CPF";
import Email from "../../../negocio/Email/Email";
import Perfil from "../../../negocio/Perfil/Perfil";
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

const CarrinhosDefault: Carrinho[] = ClientesDefaults.map(
  cliente => new Carrinho(uuidv4(), cliente, [])
);

export default CarrinhosDefault;
