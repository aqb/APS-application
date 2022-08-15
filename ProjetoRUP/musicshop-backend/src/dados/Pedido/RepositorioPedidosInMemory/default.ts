import ItemPedido from "../../../negocio/Pedido/ItemPedido";
import Pedido from "../../../negocio/Pedido/Pedido";
import PedidoStatus from "../../../negocio/Pedido/PedidoStatus";

const PedidosDefault = [
  new Pedido(
    "2819281",
    "1",
    [new ItemPedido("1", 100, 2)],
    PedidoStatus.PENDENTE
  )
];

export default PedidosDefault;
