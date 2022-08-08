import Carrinho from "../negocio/Produtos/Carrinho";

interface IRepositorioCarrinhos {
  adicionar(carrinho: Carrinho): void;
}

export default IRepositorioCarrinhos;
