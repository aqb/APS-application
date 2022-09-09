import { v4 as uuidv4 } from "uuid";

import Carrinho from "../../../negocio/Carrinho/Carrinho";
import Item from "../../../negocio/Item/Item";
import Produto from "../../../negocio/Produto/Produto";
import ClientesDefault from "../../Cliente/RepositorioClientesInMemory/default";

const CarrinhosDefault: Carrinho[] = ClientesDefault.map(cliente => {
  const id = uuidv4();
  return new Carrinho(id, cliente, [
    new Item(new Produto("3", "Cavaquinho", "Cavaquinho de pagode", 130), 10)
  ]);
});

export default CarrinhosDefault;
