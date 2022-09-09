import { v4 as uuidv4 } from "uuid";

import ItemPedido from "../../../negocio/Item/ItemPedido";
import Pedido from "../../../negocio/Pedido/Pedido";
import PedidoStatus from "../../../negocio/Pedido/PedidoStatus";
import Produto from "../../../negocio/Produto/Produto";
import ClientesDefault from "../../Cliente/RepositorioClientesInMemory/default";

const PedidosDefault = ClientesDefault.map(cliente => {
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
