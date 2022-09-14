import { Router } from "express";
import { container } from "tsyringe";

import { verifyToken } from "./authMiddleware";
import TelaEstoquePresenter from "./comunicacao/TelaEstoquePresenter";
import TelaProdutoPresenter from "./comunicacao/TelaProdutoPresenter";

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

export default routes;
