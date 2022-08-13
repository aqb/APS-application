import Produto from "../negocio/Produto/Produto";

interface IRepositorioEstoque {
  adicionar(produto: Produto): void;
}

export default IRepositorioEstoque;
