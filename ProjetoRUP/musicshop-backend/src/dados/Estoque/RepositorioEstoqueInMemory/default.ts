import Item from "../../../negocio/Item/Item";
import Produto from "../../../negocio/Produto/Produto";

const ItensDefault: Item[] = [
  new Item(new Produto("1", "Guitarra", "Guitarra de rock", 100), 13),
  new Item(new Produto("2", "Bateria", "Bateria Verde", 13000), 4),
  new Item(new Produto("3", "Cavaquinho", "Cavaquinho de pagode", 130), 20),
  new Item(new Produto("4", "Microfone", "Microfone", 219), 10),
  new Item(new Produto("5", "Pandeiro", "Pandeiro do Mumuzinho", 50000), 1),
  new Item(new Produto("14", "Guitarra", "Guitarra vermelha", 1300), 5)
];

export default ItensDefault;
