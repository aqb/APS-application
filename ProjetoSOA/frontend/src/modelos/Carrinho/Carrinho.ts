import Item from "../Item/Item";
import Usuario from "../Usuario/Usuario";

type Carrinho = {
  id: string;
  cliente: Usuario;
  itens: Item[];
};

export default Carrinho;
