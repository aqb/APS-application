import { Router } from "express";
import { container } from "tsyringe";

import AuthMiddleware from "./comunicacao/Middlewares/auth";
import TelaCarrinhoPresenter from "./comunicacao/Presenters/TelaCarrinhoPresenter";
import TelaPedidosPresenter from "./comunicacao/Presenters/TelaPedidosPresenter";

const carrinhoPresenter = container.resolve(TelaCarrinhoPresenter);
const pedidosPresenter = container.resolve(TelaPedidosPresenter);
const authMiddleware = container.resolve(AuthMiddleware);

const routes = Router();

routes.post(
  "/criar",
  authMiddleware.verify,
  async (req, res) => await carrinhoPresenter.realizarPedido(req, res)
);

routes.get("/pedidos", authMiddleware.verify, (req, res) =>
  pedidosPresenter.pegarPedidos(req, res)
);

routes.get("/pedidos/:id", authMiddleware.verify, (req, res) =>
  pedidosPresenter.pegarPedido(req, res)
);

routes.get("/health", async (req, res) => await res.status(200).send());

export default routes;
