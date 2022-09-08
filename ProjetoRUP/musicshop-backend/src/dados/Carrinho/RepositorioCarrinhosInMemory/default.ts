import Carrinho from "../../../negocio/Carrinho/Carrinho";
import Item from "../../../negocio/Item/Item";
import Produto from "../../../negocio/Produto/Produto";

const CarrinhosDefault: Carrinho[] = [
  new Carrinho("0", [
    new Item(new Produto("3", "Cavaquinho", "Cavaquinho de pagode", 130), 10)
  ]),
  new Carrinho("1", [
    new Item(new Produto("1", "Guitarra", "Guitarra de rock", 100), 2)
  ]),
  new Carrinho("2", [
    new Item(new Produto("2", "Bateria", "Bateria Verde", 13000), 1)
  ])
];

export default CarrinhosDefault;
