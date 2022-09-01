import ItemEstoque from "../../../negocio/Estoque/ItemEstoque";
import Produto from "../../../negocio/Produto/Produto";

const ItensDefault: ItemEstoque[] = [
  new ItemEstoque(new Produto("1", "Guitarra", "Guitarra de rock", 100), 13),
  new ItemEstoque(new Produto("2", "Bateria", "Bateria Verde", 13000), 4),
  new ItemEstoque(
    new Produto("3", "Cavaquinho", "Cavaquinho de pagode", 130),
    20
  ),
  new ItemEstoque(new Produto("4", "Microfone", "Microfone", 219), 10),
  new ItemEstoque(
    new Produto("5", "Pandeiro", "Pandeiro do Mumuzinho", 50000),
    1
  ),
  new ItemEstoque(new Produto("14", "Guitarra", "Guitarra vermelha", 1300), 5)
];

export default ItensDefault;
