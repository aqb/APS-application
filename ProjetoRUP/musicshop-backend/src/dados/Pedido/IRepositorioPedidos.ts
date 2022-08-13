import Cliente from "../../negocio/Cliente/Cliente";
import Carrinho from "../../negocio/Produto/Carrinho/Carrinho";

interface IRepositorioPedidos {
  adicionar(cliente: Cliente, carrinho: Carrinho): void;
}

export default IRepositorioPedidos;
