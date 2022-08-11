import { Produto } from "./Produto";

export type ItemCarrinho = {
  produto: Produto;
  quantidade: number;
};

export type Carrinho = {
  id: string;
  itens: ItemCarrinho[];
};
