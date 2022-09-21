import Carrinho from "../../negocio/Carrinho/Carrinho";
import Usuario from "../../negocio/Usuario/Usuario";

interface IRepositorioCarrinhos {
  adicionar(cliente: Usuario): Promise<Carrinho>;
  pegarCarrinhoDe(clienteId: string): Promise<Carrinho>;
  atualizarCarrinho(carrinho: Carrinho): Promise<void>;
  limparCarrinho(carrinho: Carrinho): Promise<void>;
}

export default IRepositorioCarrinhos;
