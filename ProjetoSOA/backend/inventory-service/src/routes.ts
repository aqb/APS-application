import { Router } from "express";
import { container } from "tsyringe";

import { verifyToken } from "./comunicacao/Middlewares/auth";
import TelaEstoquePresenter from "./comunicacao/Presenters/TelaEstoquePresenter";
import TelaProdutoPresenter from "./comunicacao/Presenters/TelaProdutoPresenter";

const estoquePresenter = container.resolve(TelaEstoquePresenter);
const produtoPresenter = container.resolve(TelaProdutoPresenter);

const routes = Router();

routes.get("/estoque", (req, res) => estoquePresenter.pegarEstoque(req, res));
routes.get("/produto/:id", (req, res) =>
  produtoPresenter.pegarProduto(req, res)
);
routes.post("/adicionar", verifyToken, (req, res) =>
  produtoPresenter.adicionarCarrinho(req, res)
);
routes.get("/health", (req, res) => res.status(200).send());

export default routes;
