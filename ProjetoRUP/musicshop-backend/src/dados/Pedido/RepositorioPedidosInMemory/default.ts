import ItemPedido from "../../../negocio/Item/ItemPedido";
import Pedido from "../../../negocio/Pedido/Pedido";
import PedidoStatus from "../../../negocio/Pedido/PedidoStatus";
import Produto from "../../../negocio/Produto/Produto";

const PedidosDefault = [
  new Pedido(
    "28192shashajslkasjal81",
    "1",
    [
      new ItemPedido(
        new Produto("1", "Guitarra", "Guitarra de rock", 100),
        13,
        150
      )
    ],
    PedidoStatus.PENDENTE
  )
];

export default PedidosDefault;
