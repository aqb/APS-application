import Carrinho from "../../../negocio/Produto/Carrinho/Carrinho";
import ItemCarrinho from "../../../negocio/Produto/Carrinho/ItemCarrinho";
import Produto from "../../../negocio/Produto/Produto";

const CarrinhosDefault: Carrinho[] = [
  new Carrinho("0", [
    new ItemCarrinho(
      new Produto("3", "Cavaquinho", "Cavaquinho de pagode", 130),
      10
    )
  ]),
  new Carrinho("1", [
    new ItemCarrinho(new Produto("1", "Guitarra", "Guitarra de rock", 100), 2)
  ]),
  new Carrinho("2", [
    new ItemCarrinho(new Produto("2", "Bateria", "Bateria Verde", 13000), 1)
  ])
];

export default CarrinhosDefault;
