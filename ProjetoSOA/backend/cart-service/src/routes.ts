import { Router } from "express";
import { container } from "tsyringe";

import { verifyToken } from "./comunicacao/Middlewares/auth";
import TelaCarrinhoPresenter from "./comunicacao/Presenters/TelaCarrinhoPresenter";

const carrinhoPresenter = container.resolve(TelaCarrinhoPresenter);

const routes = Router();

// TODO: funcs async??
routes.post("/carrinho", verifyToken, (req, res) =>
  carrinhoPresenter.criarCarrinho(req, res)
);
routes.get("/carrinho", verifyToken, (req, res) =>
  carrinhoPresenter.pegarCarrinho(req, res)
);
routes.post("adicionar", verifyToken, (req, res) =>
  carrinhoPresenter.adicionarAoCarrinho(req, res)
);
routes.post(
  "/realizarpedido",
  verifyToken,
  async (req, res) => await carrinhoPresenter.realizarPedido(req, res)
);
routes.get("/health", (req, res) => res.status(200).send());

export default routes;
