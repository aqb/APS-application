import ItemPedido from "../Item/ItemPedido";
import PedidoStatus from "./PedidoStatus";

type Pedido = {
  id: string;
  clienteId: string;
  itens: ItemPedido[];
  status: PedidoStatus;
};

export default Pedido;
