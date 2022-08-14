import Pedido from "../../../negocio/Pedido/Pedido";
import PedidoStatus from "../../../negocio/Pedido/PedidoStatus";
import Carrinho from "../../../negocio/Produto/Carrinho/Carrinho";
import ItemCarrinho from "../../../negocio/Produto/Carrinho/ItemCarrinho";
import Produto from "../../../negocio/Produto/Produto";

const PedidosDefault = [
  new Pedido(
    "2819281",
    "1",
    new Carrinho("1", [
      new ItemCarrinho(new Produto("1", "Guitarra", "Guitarra de rock", 100), 2)
    ]),
    PedidoStatus.PENDENTE
  )
];

export default PedidosDefault;
