import Produto from "../negocio/Produtos/Produto";

interface IRepositorioEstoque {
  adicionar(produto: Produto): void;
}

export default IRepositorioEstoque;
