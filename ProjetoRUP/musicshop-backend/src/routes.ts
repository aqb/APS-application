import { Router } from "express";
import { container } from "tsyringe";

import { verifyToken } from "./authMiddleware";
import TelaCadastroPresenter from "./comunicacao/TelaCadastroPresenter";
import TelaLoginPresenter from "./comunicacao/TelaLoginPresenter";
import TelaPedidoPresenter from "./comunicacao/TelaPedidoPresenter";
import TelaProdutoPresenter from "./comunicacao/TelaProdutoPresenter";
import TelaProdutosPresenter from "./comunicacao/TelaProdutosPresenter";

const cadastroPresenter = container.resolve(TelaCadastroPresenter);
const loginPresenter = container.resolve(TelaLoginPresenter);
const pedidoPresenter = container.resolve(TelaPedidoPresenter);
const produtoPresenter = container.resolve(TelaProdutoPresenter);
const produtosPresenter = container.resolve(TelaProdutosPresenter);

const routes = Router();

routes.post("/cadastro", (req, res) => cadastroPresenter.cadastro(req, res));
routes.post("/login", (req, res) => loginPresenter.login(req, res));
routes.get("/estoque", verifyToken, (req, res) =>
  produtosPresenter.pegarEstoque(req, res)
);
routes.get("/produto/:id", verifyToken, (req, res) =>
  produtoPresenter.pegarProduto(req, res)
);
routes.post("/adicionar", verifyToken, (req, res) =>
  produtoPresenter.adicionarCarrinho(req, res)
);
routes.post("/pedido", verifyToken, (req, res) =>
  pedidoPresenter.criarPedido(req, res)
);

export default routes;
