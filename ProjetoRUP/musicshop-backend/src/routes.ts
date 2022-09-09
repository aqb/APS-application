import { Router } from "express";
import { container } from "tsyringe";

import { verifyToken } from "./authMiddleware";
import TelaCadastroPresenter from "./comunicacao/TelaCadastroPresenter";
import TelaCarrinhoPresenter from "./comunicacao/TelaCarrinhoPresenter";
import TelaEstoquePresenter from "./comunicacao/TelaEstoquePresenter";
import TelaLoginPresenter from "./comunicacao/TelaLoginPresenter";
import TelaPedidosPresenter from "./comunicacao/TelaPedidosPresenter";
import TelaProdutoPresenter from "./comunicacao/TelaProdutoPresenter";

const cadastroPresenter = container.resolve(TelaCadastroPresenter);
const loginPresenter = container.resolve(TelaLoginPresenter);
const estoquePresenter = container.resolve(TelaEstoquePresenter);
const produtoPresenter = container.resolve(TelaProdutoPresenter);
const carrinhoPresenter = container.resolve(TelaCarrinhoPresenter);
const pedidosPresenter = container.resolve(TelaPedidosPresenter);

const routes = Router();

routes.post("/cadastro", (req, res) => cadastroPresenter.cadastro(req, res));
routes.post("/login", (req, res) => loginPresenter.login(req, res));
routes.get("/estoque", (req, res) => estoquePresenter.pegarEstoque(req, res));
routes.get("/produto/:id", (req, res) =>
  produtoPresenter.pegarProduto(req, res)
);
routes.post("/adicionar", verifyToken, (req, res) =>
  produtoPresenter.adicionarCarrinho(req, res)
);
routes.get("/carrinho", verifyToken, (req, res) =>
  carrinhoPresenter.pegarCarrinho(req, res)
);
routes.post(
  "/realizarpedido",
  verifyToken,
  async (req, res) => await carrinhoPresenter.realizarPedido(req, res)
);
routes.get("/pedidos", verifyToken, (req, res) =>
  pedidosPresenter.pegarPedidos(req, res)
);
routes.get("/pedidos/:id", verifyToken, (req, res) =>
  pedidosPresenter.pegarPedido(req, res)
);

export default routes;
