import { Router } from "express";
import { container } from "tsyringe";

import AuthMiddleware from "./comunicacao/Middlewares/auth";
import TelaCarrinhoPresenter from "./comunicacao/Presenters/TelaCarrinhoPresenter";

const authMiddleware = container.resolve(AuthMiddleware);
const carrinhoPresenter = container.resolve(TelaCarrinhoPresenter);

const routes = Router();

// TODO: funcs async??
routes.post("/carrinho", authMiddleware.verify, (req, res) =>
  carrinhoPresenter.criarCarrinho(req, res)
);

routes.get("/carrinho", authMiddleware.verify, (req, res) =>
  carrinhoPresenter.pegarCarrinho(req, res)
);

routes.post("adicionar", authMiddleware.verify, (req, res) =>
  carrinhoPresenter.adicionarAoCarrinho(req, res)
);

routes.post(
  "/realizarpedido",
  authMiddleware.verify,
  async (req, res) => await carrinhoPresenter.realizarPedido(req, res)
);

routes.get("/health", (req, res) => res.status(200).send());

export default routes;
