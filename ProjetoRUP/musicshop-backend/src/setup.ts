import { container } from "tsyringe";

import IRepositorioCarrinhos from "./dados/Carrinho/IRepositorioCarrinhos";
import RepositorioCarrinhosInMemory from "./dados/Carrinho/RepositorioCarrinhosInMemory/RepositorioCarrinhosInMemory";
import IRepositorioClientes from "./dados/Cliente/IRepositorioClientes";
import RepositorioClientesInMemory from "./dados/Cliente/RepositorioClientesInMemory/RepositorioClientesInMemory";
import IRepositorioEstoque from "./dados/Estoque/IRepositorioEstoque";
import RepositorioEstoqueInMemory from "./dados/Estoque/RepositorioEstoqueInMemory/RepositorioEstoqueInMemory";
import IRepositorioPedidos from "./dados/Pedido/IRepositorioPedidos";
import RepositorioPedidosInMemory from "./dados/Pedido/RepositorioPedidosInMemory/RepositorioPedidosInMemory";

container.register<IRepositorioClientes>("RepositorioClientes", {
  useClass: RepositorioClientesInMemory
});

container.register<IRepositorioPedidos>("RepositorioPedidos", {
  useClass: RepositorioPedidosInMemory
});

container.register<IRepositorioEstoque>("RepositorioEstoque", {
  useClass: RepositorioEstoqueInMemory
});

container.register<IRepositorioCarrinhos>("RepositorioCarrinhos", {
  useClass: RepositorioCarrinhosInMemory
});
