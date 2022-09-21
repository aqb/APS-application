import Produto from "../Produto/Produto";

type ItemPedido = {
  produto: Produto;
  valor: number;
  quantidade: number;
};

export default ItemPedido;
