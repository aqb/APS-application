import { Router } from "express";
import { container } from "tsyringe";

import { verifyToken } from "./authMiddleware";
import TelaCarrinhoPresenter from "./comunicacao/TelaCarrinhoPresenter";

const carrinhoPresenter = container.resolve(TelaCarrinhoPresenter);

const routes = Router();

routes.get("/carrinho", verifyToken, (req, res) =>
  carrinhoPresenter.pegarCarrinho(req, res)
);
routes.post(
  "/realizarpedido",
  verifyToken,
  async (req, res) => await carrinhoPresenter.realizarPedido(req, res)
);

export default routes;
