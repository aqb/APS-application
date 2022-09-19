import { Router } from "express";
import { container } from "tsyringe";

import TelaCadastroPresenter from "./comunicacao/Presenters/TelaCadastroPresenter";
import TelaLoginPresenter from "./comunicacao/Presenters/TelaLoginPresenter";
import TelaLogoutPresenter from "./comunicacao/Presenters/TelaLogoutPresenter";
import TelaPerfilPresenter from "./comunicacao/Presenters/TelaPerfilPresenter";

const cadastroPresenter = container.resolve(TelaCadastroPresenter);
const loginPresenter = container.resolve(TelaLoginPresenter);
const logoutPresenter = container.resolve(TelaLogoutPresenter);
const perfilPresenter = container.resolve(TelaPerfilPresenter);

const routes = Router();

routes.post(
  "/cadastro",
  async (req, res) => await cadastroPresenter.cadastro(req, res)
);

routes.post("/login", async (req, res) => await loginPresenter.login(req, res));

routes.post(
  "/logout",
  async (req, res) => await logoutPresenter.logout(req, res)
);

routes.post("/me", async (req, res) => await perfilPresenter.me(req, res));

routes.get("/health", async (req, res) => await res.status(200).send());

export default routes;
