import { Router } from "express";
import { container } from "tsyringe";

import AuthMiddleware from "./comunicacao/Middlewares/auth";
import TelaEstoquePresenter from "./comunicacao/Presenters/TelaEstoquePresenter";
import TelaProdutoPresenter from "./comunicacao/Presenters/TelaProdutoPresenter";

const authMiddleware = container.resolve(AuthMiddleware);
const estoquePresenter = container.resolve(TelaEstoquePresenter);
const produtoPresenter = container.resolve(TelaProdutoPresenter);

const routes = Router();

routes.get(
  "/estoque",
  async (req, res) => await estoquePresenter.pegarEstoque(req, res)
);

routes.get(
  "/produto/:id",
  async (req, res) => await produtoPresenter.pegarProduto(req, res)
);

routes.post(
  "/adicionar",
  authMiddleware.verify,
  async (req, res) => await produtoPresenter.adicionarCarrinho(req, res)
);

routes.get("/health", (req, res) => res.status(200).send());

export default routes;
